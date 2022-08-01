import { FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "./Context/CardContext";
import React from 'react'
import { useState } from "react";
const Navbar = () => {
  const [cart] = React.useContext(CartContext)
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

  // For mobile menu
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const logout = () => {
    localStorage.clear()
    window.location = '/'
  }
  var menu;
  if (localStorage.getItem('token')) {
    menu = (
      <div className="w-full h-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1 className="font-semibold text-2xl">
            Glam <strong>Up.</strong>
          </h1>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-14 items-center">
          <Link to="/" className="mx-auto">
            <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
              Home
            </button>
          </Link>

          <Link to="/category" className="mx-auto">
            <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
              Category
            </button>
          </Link>

          <Link to="/aboutus" className="mx-auto">
            <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
              About Us
            </button>
          </Link>

          <Link to="/contact" className="mx-auto">
            <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">

          <div className="" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle px-3" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user?.username}
                </a>
                <ul class="dropdown-menu dropdown-menu-dark " aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><Link to='/user' className="dropdown-item" >Profile</Link></li>
                  <li><a className="dropdown-item" href="#">   <Link to="#" className="mx-auto">
                    <button className="" onClick={logout}>
                      Log Out
                    </button>
                  </Link>
                  </a></li>
                </ul>
              </li>
              
            </ul>
            
            
          </div>


          <Link to="/cart"><button className="rounded-full w-auto h-auto px-5 py-2 flex items-center gap-2">
            Cart {cart?.length}
            <div className="w-7 h-7 rounded-full bg-black flex justify-center items-center">
              <FaShoppingCart className="text-white" />
            </div>
          </button></Link>
          <div className="relative">
            <button className="block md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <FiMenu size={25} />
            </button>

            {showMobileMenu && (
              <div className="absolute top-12 rounded-lg shadow-lg -left-[10rem] w-auto border border-blue-600 bg-white px-10 py-3 flex flex-col gap-5 h-auto">
                <Link to="/" className="mx-auto">
                  <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    Home
                  </button>
                </Link>

                <Link to="/category" className="mx-auto">
                  <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    Category
                  </button>
                </Link>

                <Link to="/aboutus" className="mx-auto">
                  <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    About Us
                  </button>
                </Link>

                <Link to="/contact" className="mx-auto">
                  <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    Contact Us
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
      </div>
      
    );
  } else {
    menu = (
      <div className="w-full h-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1 className="font-semibold text-2xl">
            Glam <strong>Up.</strong>
          </h1>
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-14 items-center">
          <Link to="/" className="mx-auto">
            <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
              Home
            </button>
          </Link>

          <Link to="/" className="mx-auto">
            <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
              Category
            </button>
          </Link>

          <Link to="/aboutus" className="mx-auto">
            <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
              About Us
            </button>
          </Link>

          <Link to="/contact" className="mx-auto">
            <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">


          <Link to="/login" className="mx-auto">
            <button className="border-2 border-gray-800 rounded-2xl rounded-br-none w-auto h-auto px-8 py-2 hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out">
              LogIn
            </button>
          </Link>

          {/* For Mobile Menu */}
          <div className="relative">
            <button className="block md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <FiMenu size={25} />
            </button>

            {showMobileMenu && (
              <div className="absolute top-12 rounded-lg shadow-lg -left-[10rem] w-auto border border-blue-600 bg-white px-10 py-3 flex flex-col gap-5 h-auto">
                <Link to="/" className="mx-auto">
                  <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    Home
                  </button>
                </Link>

                <Link to="/" className="mx-auto">
                  <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    Category
                  </button>
                </Link>

                <Link to="/aboutus" className="mx-auto">
                  <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    About Us
                  </button>
                </Link>

                <Link to="/contact" className="mx-auto">
                  <button className="hover:underline font-semibold text-lg text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    Contact Us
                  </button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }
  return (
    <div>
      {menu}
    </div>)
};

export default Navbar;
