import React, {useState} from "react";
import ProductCard from "../ProductCard";
import axios from "axios";
import "./SearchBarSection.css";
import {Link} from 'react-router-dom'

const SearchBarSection = () => {
  const [product , setProduct] = React.useState([])
  React.useEffect(()=>{
    axios.get('http://localhost:1025/product/get').then((res)=>{
      setProduct(res.data.data)
      console.log(res.data.data)
    }).catch(e=>{
      console.log(e);
    })
  },[])
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Check Textured Coat",
      category: "Coat",
      price: "175.4",
      
    },
    {
      id: 2,
      name: "Contrast Check Coat",
      category: "Coat",
      price: "155.4",
    },
    {
      id: 3,
      name: "White Coat",
      category: "Coat",
      price: "125.4",
    },
    {
      id: 4,
      name: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
    },
    {
      id: 5,
      name: "Basic Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
    },
    {
      id: 6,
      name: "Basic short Hoodie",
      category: "Hoodies / SweatShirts",
      price: "55.4",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredProducts = product.filter((product) => {
    if (
     
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    ) {
      return product;
    }
  });

  return (
    <div className="searchBarSection">
      <div class="searchBar mb-10">
        <input
          className="input pl-2"
          placeholder="Search Products"
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
        <button className="button">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
          
          <ProductCard
           key={product.id}
           image={product.image}
           name={product.name}
           price={product.price}
         />
        
        ))}
      </div>
    </div>
  );
};

export default SearchBarSection;