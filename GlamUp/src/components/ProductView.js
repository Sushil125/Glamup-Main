import MyFooter from "./MyFooter";
import React, { useState } from 'react';
import Navbar from "./Navbar";
import { BsFlag } from 'react-icons/bs'
import { AiOutlineLike } from 'react-icons/ai'
import { BiShare } from 'react-icons/bi'
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { CartContext } from "./Context/CardContext";

import axios from "axios";

const ProductView = () => {
  var { id } = useParams()
  const [message, setMessage] = useState("");
  const [prodata, setProdata] = useState([]);
  const [cart] = React.useContext(CartContext)
  const [rating, setRating] = useState();



  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  // get user form the token
  const token_data = localStorage.getItem("token")
  const token = parseJwt(token_data)
  const user = token.id
  console.log(user)



  const deletecomment = (e, commentId) => {
    e.preventDefault();
    axios.delete("http://localhost:1025/product/comment/delete/" + commentId)


  };

  const addcomment = (e) => {
    e.preventDefault();

    const adata = { message: message, user: user, product: id, star: rating }


    axios
      .post("http://localhost:1025/product/comment/add", adata)
      .then((result12) => {

        if (result12.data) {

          window.location = "/productview/" + id
          alert("Comment Added succsessfullly!!");
        }

      })
      .catch();
  };



  // 

  const [product, setProduct] = React.useState('')

  React.useEffect(() => {
    axios.get('http://localhost:1025/product/view/' + id).then((res) => {
      setProduct(res.data.data)
    }).catch(e => {
      console.log(e);
    })

    axios.get("http://localhost:1025/product/comment/view/" + id).then((result) => {
      console.log(result);
      setProdata(result.data);
    }).catch((e) => {
      console.log("something went wrong");
    });


  }, [])
  console.log(prodata)

  // add to cart 
  const addtoCart = async (e, productId) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:1025/user/addtocart/${productId}`, {
        user
      })
      if (res) {
        window.location = "/productview/" + id
        Swal.fire({
          icon: "success",
          title: "Successfully Added to Cart",
        });
        console.log(res.data)
      } else {
        console.log('something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full h-screen p-10">
      <Navbar />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="productImg"
              className="lg:w-1/2 w-full lg:h-auto h-50 object-cover object-center rounded"
              src={`http://localhost:1025/${product.image}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">


              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.brandname}
              </h2>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {/* <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  > 
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg> */}
                  {/* <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span> */}
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
                {product.description}
              </p>
              {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div> */}
              <div className="flex mt-20">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>


                <button
                  type='submit'
                  className="bg-[#5E73E1] text-white font-semibold rounded-2xl py-2 w-28 mx-auto transition-all ease-in-out duration-300 hover:bg-blue-800 hover:-translate-y-3"
                  onClick={e => addtoCart(e, product._id)}
                >
                  Add to Cart
                </button>

                <form>

                </form>

              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div class="form-group">
          <ReactStars
            count={5}
            onChange={(rating) => { setRating(rating) }}
            size={24}
            activeColor="#ffd700"
          />
          <input style={{ border: '2px solid gray' }}
            type='textarea'
            class="form-control py-5"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Add a comment"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>

          <button type="submit" class="btn mt-3 btn-info"
            onClick={addcomment}

          >Post</button>
        </div>

        {prodata?.map((singledata) => {
          return (
            <div>
              <div className="d-flex">
                <img
                  src={"http://localhost:1025/" + singledata.user?.profile}
                  className="imagesss rounded-circle p-2 m-3"
                />
                <div className="flex items-center w-full">
                  <div className="flex flex-col w-[90%]">
                    <h5 className="pl-1 pt-4">{singledata.user.fullname}</h5>

                    <div className="flex gap-2 items-center">
                      {
                        singledata.star === 1 ?
                          <i className="fas fa-star"></i> :
                          singledata.star === 2 ?
                            <><i className="fas fa-star"></i>
                              <i className="fas fa-star"></i></> :
                            singledata.star === 3 ?
                              <><i className="fas fa-star"></i>
                                <i className="fas fa-star">
                                </i><i className="fas fa-star"></i></> :
                              singledata.star === 4 ?
                                <><i className="fas fa-star"></i>
                                  <i className="fas fa-star"> </i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i></> :
                                singledata.star === 5 ?
                                  <><i className="fas fa-star"></i>
                                    <i className="fas fa-star"> </i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i></> : null
                      }
                    </div>

                    <p className="mt-3">{singledata.message}</p>

                  </div>

                  <div className="w-[10%]">
                    <button className="bg-black w-7 h-7 rounded-xl flex justify-center items-center mt-5" onClick={deletecomment.bind(this,)}>
                      <MdDeleteOutline className="text-white" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div >
      <MyFooter />
    </div >
  );
};

export default ProductView;
