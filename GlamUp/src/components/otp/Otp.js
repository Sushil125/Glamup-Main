import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
const Otp = () => {
    // const [user, setUser] = useState({
    //     email: "",
    //     verificationcode:""
    //   });
    //   const handelChange = (e) => {
    //     const { name, value } = e.target;
    //     setUser({
    //       ...user,
    //       [name]: value,
    //     });
    //   };
    const { state } = useLocation();
    const email = state.email
    const [msg, setMsg] = useState('')
    const [verificationcode, setCode] = useState('')
    const navigation = useNavigate()
    const verifyOtp = (e) => {
        e.preventDefault()
        // const { email,verificationcode } = user
        if ( verificationcode) {
        axios.post('http://localhost:1025/user/emailverification', 
            {
               email,
               verificationcode:verificationcode
            }
        ).then(res => {
            console.log(res);
            if (res.data.message === "Email verified succefully") {
                navigation('/login',{ state: { email: email } })
                Swal.fire({
                    icon: 'success',
                    title: 'Email verified',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Incorrect Otp',
                  })
            }
        })
    }
    }
    // resend otp code
    const resetform = () => {
        document.getElementById("create-course-form").reset();
    }
    const Resendotp = () => {
        axios.put(`/resend-otp/${email}`).then(d => {
            console.log(d);
            resetform()
            setMsg()
        }).catch(e => {
            console.log(e);
        })
    }
    return (
        <>
            <div id='otp' style={{ marginTop: "100px" }} className="container">
                <div className="d-flex justify-content-center align-items-center container">
                    <div className="card py-5 px-3">
                        <h5 className="m-0 h4">OTP verification</h5><span className="mobile-text">Enter the code we just send on your email&nbsp;<b className="text-danger"></b></span>
                        <form method='post' id="create-course-form" >
                            <div className="d-flex flex-row mt-5">
                                <input name='verificationcode' value={verificationcode} onChange={e=>setCode(e.target.value)} type="text" className="form-control otp1"  />
                                </div>
                            <button type='submit' className='btn btn-outline-warning my-2 d-block mx-auto' onClick={verifyOtp}>Verify</button>
                        </form>
                        <p className='text-success my-2 h5 text-center'>{msg}</p>
                        <div className="text-center mt-3"><span className="d-block mobile-text">Don't receive the code?</span><span style={{ cursor: 'pointer' }} onClick={Resendotp.bind(this)} className="font-weight-bold text-danger cursor">Resend</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Otp