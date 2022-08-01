import Navbar from "../Navbar";
import React from "react";
import MyFooter from "../MyFooter";
import Khalti from "./CHeckout/Khalti"
import { Link, useNavigate } from "react-router-dom";
import ItemImage from "../../../src/assets/images/nati-melnychuk-51sGDpm5S78-unsplash.jpg";
import ItemImage2 from "../../../src/assets/images/lina-verovaya-F39Yk-FM_fg-unsplash.jpg";
import ItemImage3 from "../../../src/assets/images/pmv-chamara-MEsWk-dZzlI-unsplash.jpg";
import { CartContext } from "../Context/CardContext";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const CartView = () => {
  const navigation = useNavigate();
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


  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = React.useContext(CartContext)
  const [CartItems, setCartItems] = React.useState([{
    id: 1,
    image: ItemImage,
    name: "Face Wash",
    price: "Rs. 2000",
    quantity: 1,
  },
  {
    id: 2,
    image: ItemImage2,
    name: "BB Cream",
    price: "Rs. 1000",
    quantity: 1,
  },
  {
    id: 3,
    image: ItemImage3,
    name: "Lip-stick",
    price: "Rs. 800",
    quantity: 1,
  },])
  const ClearCart = async (e) => {
    e.preventDefault();
    // const {  email,  password} = user

    axios.put("http://localhost:1025/user/emptycart", { user: user.id, cart: cart }).then(res => {

      window.location = "/cart"


    })
  }

  const Checkout = async (e) => {
    e.preventDefault();
    // const {  email,  password} = user

    axios.post("http://localhost:1025/user/checkout", { user: user.id, cart: cart }).then(res => {
      console.log(res.data)
      navigation("/")
      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully"
      })

    })
  }
  console.log(cart)
  React.useEffect(() => {

    axios.get("http://localhost:1025/user/cart").then((res) => {
      setCartItems(res.data.data)
      console.log(res.data.data)
    }).catch(e => {
      console.log(e);
    })
  }, [])



  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSubstract = () => {
    let newQuantity = quantity - 1
    if (newQuantity <= 0) {
      setQuantity(0);
    }
    else {
      setQuantity(newQuantity);
    }

  };



  return (
    <div className="w-full h-screen p-10">
      <Navbar />
      <div className="my-5 bg-white rounded-3xl shadow-sm p-10 h-auto">
        {/* top headers */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-semibold">My Cart</h2>

          {/* Clear Cart */}
          <button
            className="px-3 rounded-xl shadow-sm py-2 bg-red-600 text-white"
            onClick={ClearCart}
          >
            Empty Cart
          </button>
        </div>

        {/* Cart Items Loop Data */}
        <div className="flex flex-col gap-3 mb-5">
          {cart.map((item) => (
            <div className="mb-2">
              <div
                key={item._id}
                className="grid grid-cols-12 gap-4 bg-gray-100 shadow-sm rounded-xl p-3"
              >
                {/* Item Image and Name */}
                <div className="col-span-5 h-auto flex items-center gap-3">
                  {/* Image of Product */}
                  <img
                    src={`http://localhost:1025/${item.productId.image}`}
                    className="rounded shadow-md w-16 h-16 object-cover"
                    alt="itemImage"
                  />

                  {/* Name of Product */}
                  <p className="text-gray-700 font-semibold">{item.productId.name}</p>
                </div>

                {/* Quantity */}
                <div className="col-span-3 flex justify-center items-center gap-3">
                  <button onClick={() => handleAdd().bind(this, item._id)}>
                    <FiPlus />
                  </button>

                  <div className="flex justify-center items-center w-9 h-9 border-2 border-gray-400 shadow-sm rounded-xl">
                    <p className="text-sm mt-3">{quantity}</p>
                  </div>

                  <button onClick={() => handleSubstract().bind(this, item._id)}>
                    <FiMinus />
                  </button>
                </div>

                {/* Price */}
                <div className="col-span-3 flex justify-center items-center">
                  <p className="font-semibold ">${item.productId.price}</p>
                </div>

                {/* Delete */}
                <div className="col-span-1 flex justify-center items-center">
                  <button className="bg-red-600 w-10 h-10 rounded-xl flex justify-center items-center">
                    <MdDelete className="text-white" size={20} />
                  </button>
                </div>
              </div>

            </div>


          ))}
        </div>

        {/* Total */}
        <div className="mt-4 border-t-2 border-dotted w-full h-auto pt-3 flex flex-row-reverse">
          <h3 className="font-semibold ">Total: ${cart?.reduce((acc, curr) => {
            return acc + curr?.productId.price * curr?.quantity
          }, 0)}</h3>
        </div>
        <button
          className="px-3 rounded-xl shadow-sm py-2 bg-red-600 text-white"
          onClick={Checkout}
        >Check Out</button>

        <button
          className="px-3 rounded-xl shadow-sm py-2 bg-red-600 text-white"

        >



          <Khalti />
        </button>
      </div>
      <MyFooter />
    </div>
  );

};
export default CartView
