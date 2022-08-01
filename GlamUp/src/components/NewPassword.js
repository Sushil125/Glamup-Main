import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Newpassword() {

  
  const navigation = useNavigate();

  const [password, setPassword] = useState("");




  const [email, setEmail] = useSearchParams();

  const updatePassword = (e) => {
    e.preventDefault();
    axios.put("http://localhost:1025/user/updatepassword",{email:email.get('email'),password:password})
    .then(result=>{
    if(result.data){
      navigation("/login")
      Swal.fire({

        icon: 'success',
        title: 'Password has been changed',
        showConfirmButton: false,
        timer: 1500
      })
     
       }
       
       
       else{
         alert('Something went wrong')
       }
      
      
     })

  }

  return (
    <div className="col-span-1 flex flex-col justify-center items-center">

      <h1 className="text-5xl font-semibold">Add New Password</h1>
      <form className="text-gray-600 body-font relative" onSubmit={updatePassword}>
        <div className="flex flex-col mt-[50px]">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-b focus:outline-none"
            placeholder="New Password"
            required
          />



          <button
            className="mt-16 bg-[#5E73E1] text-white font-semibold rounded-2xl py-3 w-28 mx-auto transition-all ease-in-out duration-300 hover:bg-blue-800 hover:-translate-y-3">
            Submit
          </button>


        </div>
      </form>
    </div>
  )
}