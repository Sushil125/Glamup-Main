import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Navbar from "../Navbar"
import "./UserProfile.css";

const ProfileScreen = () => {

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    // get user form the token
    const token_data = localStorage.getItem("token")
    const token = parseJwt(token_data)
    const user = token
    console.log(user)

    const [fullname, setfullname] = useState();
    const [profile, setProfile] = useState();
    const [image, setimage] = useState("");
    const [email, setemail] = useState();
    const [contact, setcontact] = useState();
    const [address, setaddress] = useState();
    const navigation = useNavigate();

    const updateProfile = () => {


        if (fullname && email && contact && address) {
            axios.put("http://localhost:1025/user/update/" + user.id, { fullname, email, contact, address }).then(res => {
                console.log(res);
                if (res.data.message === "User Profile Updated") {

                    Swal.fire({

                        icon: 'success',
                        title: 'Profile has been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            })
        }
    }


    const updateProfileImage = () => {

        let fd = new FormData()
        fd.append("image", image)


        axios.put("http://localhost:1025/user/update-profile/" + user.id, fd).then(res => {
            console.log(res);

            if (res.data.message === "User Profile Picture Uploaded") {

                Swal.fire({

                    icon: 'success',
                    title: 'Profile Image has been updated',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        })
    }

    return (
        <div className="w-full h-screen p-10">
            <Navbar />
            <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-md-4 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25">
                                                <img src={`http://localhost:1025/${user.image}`} className="img-radius" alt="User-Profile-Image" />
                                            </div>
                                            <button className="mt-8  bg-[#5E73E1] text-white font-semibold rounded-2xl py-3 w-28 mx-auto transition-all ease-in-out duration-300 hover:bg-blue-800 hover:-translate-y-3" data-bs-toggle="modal" data-bs-target="#picture">Update Picture</button>
                                            <p></p>
                                            <h6 className="f-w-600">{user.username}</h6>
                                            <p></p>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-block">

                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">User Information</h6>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <p className="m-b-4 f-w-600">Email</p>
                                                    <h6 className="text-muted m-b-10 f-w-400">{user.email}</h6>
                                                </div>
                                            </div>
                                            <p className="m-b-4 f-w-600">Contact number</p>
                                            <h6 className="text-muted m-b-10 f-w-400">{user.contact}</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-4 f-w-600">Address</p>
                                                    <h6 className="text-muted f-w-400">{user.address}</h6>
                                                </div>
                                            </div>
                                            <ul className="social-link list-unstyled m-t-40 m-b-10">
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                            </ul>
                                        </div>


                                        <button type="button" class="mt-16 bg-[#5E73E1] text-white font-semibold rounded-2xl py-3 w-28 mx-auto transition-all ease-in-out duration-300 hover:bg-blue-800 hover:-translate-y-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Edit Profile
                                        </button>


                                        <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <input
                                                            type="text"
                                                            name="fullname"

                                                            onChange={e => setfullname(e.target.value)}
                                                            className="bg-transparent border-b focus:outline-none"
                                                            placeholder="Full Name"
                                                        />
                                                        <input
                                                            type="email"
                                                            name="email"

                                                            onChange={e => setemail(e.target.value)}
                                                            className="bg-transparent border-b focus:outline-none mt-5"
                                                            placeholder="Email"
                                                        />
                                                        <input
                                                            type="number"
                                                            name="contact"

                                                            onChange={e => setcontact(e.target.value)}
                                                            max={10}
                                                            className="bg-transparent border-b focus:outline-none mt-5"
                                                            placeholder="Phone Number"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="address"

                                                            onChange={e => setaddress(e.target.value)}
                                                            className="bg-transparent border-b focus:outline-none mt-5"
                                                            placeholder="Address"
                                                        />
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="mt-16 bg-[#5E73E1] text-white font-semibold rounded-2xl py-3 w-28 mx-auto transition-all ease-in-out duration-300 hover:bg-blue-800 hover:-translate-y-3" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="mt-16 bg-[#5E73E1] text-white font-semibold rounded-2xl py-3 w-28 mx-auto transition-all ease-in-out duration-300 hover:bg-blue-800 hover:-translate-y-3" onClick={updateProfile}>Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="modal fade" id="picture" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLabel">
                                                            Uploading a new photo</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p class="body-desc">
                                                            It will be easier for your friends to recognize you if you upload your real photo. You can upload the image in JPG, GIF or PNG format. </p>
                                                        <div class="photo-input"> <input type="file" id="form-control" onChange={(e) => setimage(e.target.files[0])} /> <button class="btn btn-sm btn-primary" onClick={updateProfileImage}> Save </button> </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <p class="footer-title">
                                                            If you're having problems uploading, try choosing a smaller photo.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    );
};
export default ProfileScreen;