import React from 'react'
import axios from 'axios'
import { useEffect, useState } from "react";
import '../pages/Dashboard/dash.css'
import { Link ,useNavigate} from 'react-router-dom'
import { BsPencilSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import {FaPeopleCarry} from 'react-icons/fa';
import {FaUserCheck} from 'react-icons/fa';
import {ImProfile, ImCross} from 'react-icons/im';
import {AiOutlineUsergroupAdd} from 'react-icons/ai';

export const ViewUser = () => {

    
    const logout=()=>{
        localStorage.clear();
        window.location.replace('/')
    }

    const navigation =useNavigate()
    const [viewdata, setViewdata] = useState([]);

 

     
    const deleteuser =(id)=>{
      axios.delete("http://localhost:1025/user/deleteuser/"+id)
      window.location="/dashboard/registereduser"
    }

    useEffect(()=>{
        axios.get("http://localhost:1025/user/details")
        .then(result=>{
            
                console.log(result.data)
                setViewdata(result.data);}
            
        )
        .catch(e=>{
            console.log("something went wrong")
        })
     }, [])

     
    return (
        <>
            <div className="d-flex" id="wrapper">
                {/* Sidebar */}
      <div className="bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i className="fas fa-user-secret me-2" />Glamup</div>
        <div className="list-group list-group-flush my-3">
          <Link to="/dashboard" className="list-group-item list-group-item-action bg-transparent second-text active"><i className="fas fa-tachometer-alt me-2" />Dashboard</Link>
          <Link to="/dashboard/addproducts" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-plus me-2" />Add Products</Link>
          <Link to="/dashboard/orders" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fab fa-first-order me-2" />View Orders</Link>
          <Link to="/dashboard/registereduser" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i className="fas fa-users me-2" />View Registered Users</Link>
          <Link to="#" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold" onClick={logout}><i className="fas fa-power-off me-2" />Logout</Link>
        </div>
      </div>
      {/* /#sidebar-wrapper */}
                {/* Page Content */}
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" />
                            <h2 className="fs-2 m-0">Dashboard</h2>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle second-text fw-bold" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-user me-2" />Admin
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link to="/userprofile" className="dropdown-item">Profile</Link></li>
                                        <li><Link to="#" className="dropdown-item" onClick={logout}>Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="container-fluid px-3">
                    <div className="row g-3 my-2">
            <div className="col-md-3">
              <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2">720</h3>
                  <p className="fs-5">Products</p>
                </div>
                <i className="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2">4920</h3>
                  <p className="fs-5">Sales</p>
                </div>
                <i className="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2">3899</h3>
                  <p className="fs-5">Delivery</p>
                </div>
                <i className="fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2">%25</h3>
                  <p className="fs-5">Increase</p>
                </div>
                <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3" />
              </div>
            </div>
          </div>
                        <div className="row my-5">
                            <h3 className="fs-4 mb-3">Recent Registered User</h3>
                            <div className="container mx-auto">
                                <table className="table bg-white rounded shadow-sm  table-hover">
                                    <thead style={{ fontSize: ".9em" }}>
                                        <tr>
                                            <th scope="col">Fullname</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Action</th>
                                            {/* <th scope="col">problemdescription</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr/>
            {viewdata.map(singleData=>{
            console.log(singleData);
            return (
        
          singleData?.userType==="Admin"? null:<tr>
          <td>{singleData.fullname}</td>
          <td>{singleData.email}</td>
          <td>{singleData.contact}</td>
          <td>{singleData.address}</td>
         <td> <button type="button" class="btn btn-info" onClick={deleteuser.bind(this,singleData._id)} >Delete User</button></td>
          <div className='d-flex'>
           

           </div>
        </tr>
        
            )
        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /#page-content-wrapper */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Invoice</h5>
                        </div>
                        <div className="modal-body">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewUser;