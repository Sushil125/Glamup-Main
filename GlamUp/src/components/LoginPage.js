import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const LoginPage = ({ handlePageState }) => {
  const navigation = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async(e) => {
    e.preventDefault();
    const {  email,  password} = user
    if ( email &&  password) {
      axios.post("http://localhost:1025/user/login", user).then(res => {
        
        if (res.data.isAdmin===false) {
          localStorage.setItem('token',res.data.accessToken)
          navigation('/', { state: { email: user.email } })
          Swal.fire({
  
            icon: 'success',
            title: 'Login Succesfull',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(res.data.isAdmin){
          localStorage.setItem('token',res.data.accessToken)
          navigation('/dashboard', { state: { email: user.email } })
          Swal.fire({
  
            icon: 'success',
            title: 'Admin Login Succesfull',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if(res.data.message==="Email is not verified"){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email not verified',
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Incorrect Email and Password',
          })
        }
      })
    } else {
        Swal.fire({
          icon: 'error',
          text: 'Enter Something',
        })
      }
    }

  return (
    <div className="col-span-1 flex flex-col justify-center items-center">
      
      <h1 className="text-5xl font-semibold">Login</h1>

      <div className="flex flex-col mt-[50px]">
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handelChange}
          className="bg-transparent border-b focus:outline-none"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handelChange}
          className="bg-transparent border-b focus:outline-none mt-5"
          placeholder="Password"
        />
        <a href="/forgotpassword" className="text-xs text-[#2C4CF3] mt-3">
          Forgot Password?
        </a>

        <button
        id="loginBtn"
          className="mt-16 bg-[#5E73E1] text-white font-semibold rounded-2xl py-3 w-28 mx-auto transition-all ease-in-out duration-300 hover:bg-blue-800 hover:-translate-y-3"
          onClick={login}
        >
          Login
        </button>
 
        <p className="mt-3 text-sm">
          Don't Have An Account?
          <button id="createAccount" className="text-[#2C4CF3]" onClick={() => handlePageState(1)}>
            &nbsp;Create Now
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
