import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../pages/Dashboard/dash.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

export const AddProducts = () => {
  const navigation = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("t"),
    },
  };

  const [prodata, setProdata] = useState([]);

  const [brandname, setBrandname] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setimage] = useState("");
  const [productid, setProductId] = useState();




  const updateproduct = () => {


    const adata = {
      brandname, name, description, category, price, image
    }
    axios.put("http://localhost:1025/product/edit/" + productid, adata).then(res => {
      console.log(res);
      if (res.data.message === "Product Updated") {
        window.location = "/dashboard/addproducts"
        Swal.fire({

          icon: 'success',
          title: 'Product has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      }

    })

  }

  const addproduct = (e) => {
    e.preventDefault();

    const adata = new FormData();


    adata.append("brandname", brandname);
    adata.append("name", name);
    adata.append("description", description);
    adata.append("category", category);
    adata.append("price", price);
    adata.append("image", image);

    console.log(adata);
    axios
      .post("http://localhost:1025/product/add", adata)
      .then((result12) => {
        console.log(result12.data.success);

        if (result12.data.success) {
        }
        Swal.fire({

          icon: 'success',
          title: 'Product has been added',
          showConfirmButton: false,
          timer: 1500
        })
        window.location = "/dashboard/addproducts"
      })
      .catch();
  };

  const deleteProduct = (id) => {

    axios.delete("http://localhost:1025/product/delete/" + id)
    Swal.fire({

      icon: 'success',
      title: 'Product has been deleted',
      showConfirmButton: false,
      timer: 1500
    })
    window.location = "/dashboard/addproducts"

  }

  useEffect(() => {
    axios
      .get("http://localhost:1025/product/get")
      .then((result) => {
        console.log(result);
        setProdata(result.data.data);
      })

      .catch((e) => {
        console.log("something went wrong");
      });
  }, []);


  return (
    <><div id="addProduct">
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
              <i
                className="fas fa-align-left primary-text fs-4 me-3"
                id="menu-toggle"
              />
              <h2 className="fs-2 m-0">Add Products Here</h2>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle second-text fw-bold"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user me-2" />
                    Admin
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to="/userprofile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item" onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>


          <div className="container mt-3">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <form action="" id="addProductForm">
                  <h1 className="custom-heading-h2 p-3 ml-5">Add Products </h1>



                  <div className="form-group">
                    <input
                      type="text"
                      id="brandname"
                      name="brandname"
                      className="form-control border-b focus:outline-none"
                      placeholder="brandname"
                      
                      value={brandname}
                      onChange={(e) => setBrandname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className=" form-control border-b focus:outline-none"
                      placeholder="name"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group border-b focus:outline-none">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="description"
                      id="description"
                      name="description"
                      defaultValue={("description")}
                      // value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group border-b focus:outline-none">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="category"
                      id="category"
                      name="category"
                      
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group border-b focus:outline-none">
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      placeholder="price"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group ">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setimage(e.target.files[0])}
                      
                    />
                  </div>
                  <button
                    type="submit"
                    id="addProduct"
                    className="btn btn-dark ml-5"
                    onClick={addproduct}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="container ">
            <div className="row">
              <h4 className="text-center mt-5">Added Products </h4>
              {prodata?.map((singleData) => {
                return (
                  <div className="col-md-4 mt-5 ">
                    <Link to={`/productview/${singleData._id}`}>
                      <ProductCard
                        key={singleData._id}
                        name={singleData.name}
                        image={singleData.image}
                        price={singleData.price}
                      />
                    </Link>
                    <div className="modal fade" id="updateproduct" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">

                            <input
                              type="text"
                              name="brandname"
                              className="bg-transparent border-b focus:outline-none"
                              placeholder="brandname"
                              value={brandname}
                              onChange={(e) => setBrandname(e.target.value)}
                            />



                            <input
                              type="text"
                              className="bg-transparent border-b focus:outline-none"
                              placeholder="name"
                              name="name"
                              value={name}
                              onChange={e => setName(e.target.value)}
                            />



                            <input
                              type="text"
                              className="bg-transparent border-b focus:outline-none"
                              placeholder="description"
                              name="description"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                            />


                            <input
                              type="text"
                              className="bg-transparent border-b focus:outline-none"
                              placeholder="category"
                              name="category"
                              value={category}
                              onChange={e => setCategory(e.target.value)}
                            />



                            <input
                              type="text"
                              className="bg-transparent border-b focus:outline-none"
                              name="price"
                              placeholder="price"
                              value={price}
                              onChange={e => setPrice(e.target.value)}
                            />


                            <input
                              type="file"
                              className="form-control"
                              onChange={e => setimage(e.target.files[0])}
                            />

                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateproduct}>Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="button" className="btn btn-warning ml-5 mt-2" data-bs-toggle="modal" data-bs-target="#updateproduct" onClick={() => {
                      setBrandname(singleData.brandname)
                      setName(singleData.name)
                      setDescription(singleData.description)
                      setCategory(singleData.category)
                      setPrice(singleData.price)
                      setProductId(singleData._id)
                    }}>Update</button>
                    <button type="button" className="btn btn-warning ml-5 mt-2" onClick={deleteProduct.bind(this, singleData._id)}>Delete</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
</div>
    </>
  );
};
export default AddProducts;