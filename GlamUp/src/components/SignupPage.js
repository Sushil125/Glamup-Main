import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

const Signup = ({ handlePageState }) => {
  const navigation = useNavigate()
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    contact: "",
    address: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = (e) => {
    e.preventDefault()
    const { fullname, email, contact, address, password } = user
    if (fullname && email && contact && address && password) {
      axios.post("http://localhost:1025/user/register", user).then(res => {
        console.log(res);
        if (res.data.message === "User Registered") {
          navigation('/otp', { state: { email: user.email } })
          Swal.fire({

            icon: 'success',
            title: 'Account has been created',
            showConfirmButton: false,
            timer: 1500
          })
        } else if (res.data.message === "Email already registered") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email already registered',
          })

        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
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
      
      <h1 className="text-5xl font-semibold">Signup</h1>

      <div className="flex flex-col mt-[50px]">
        <input
          type="text"
          name="fullname"
          value={user.fullname}
          onChange={handelChange}
          className="bg-transparent border-b focus:outline-none"
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handelChange}
          className="bg-transparent border-b focus:outline-none mt-5"
          placeholder="Email"
        />
        <input
          type="number"
          name="contact"
          value={user.contact}
          onChange={handelChange}
          max={10}
          className="bg-transparent border-b focus:outline-none mt-5"
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handelChange}
          className="bg-transparent border-b focus:outline-none mt-5"
          placeholder="Address"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handelChange}
          className="bg-transparent border-b focus:outline-none mt-5"
          placeholder="Password"
        />

        <button id="registerBtn" className="mt-16 bg-[#5E73E1] text-white font-semibold rounded-2xl py-3 w-28 mx-auto transition-all ease-in-out duration-300 hover:bg-blue-800 hover:-translate-y-3" onClick={register}>
          Sign up
        </button>

        <p className="mt-3 text-sm text-center">
          Already a member?
          <button className="text-[#2C4CF3]" onClick={() => handlePageState(0)}>
            &nbsp;Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
