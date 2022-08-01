import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './dash.css';
const Dashboard = () => {
  const [navcollapse, setNavcollapse] = useState(false);
  function onclick(){
    setNavcollapse(!navcollapse)
    console.log(navcollapse);
  }
  const logout = () => {
    localStorage.clear();
    window.location.replace('/')
}
  return (
    <div id='adminPage'>
    <div  className={navcollapse?"d-flex toggled": "d-flex"} id="wrapper">
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
            <i onClick={onclick} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" />
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
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid px-4">
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
         
        </div>
      </div>
    </div>
    </div>
  )
}
export default Dashboard