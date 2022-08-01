import ProductCard from "./ProductCard";
import React from 'react'
import axios from "axios";
import ProductImage1 from "../assets/images/lina-verovaya-F39Yk-FM_fg-unsplash.jpg";
import ProductImage2 from "../assets/images/nati-melnychuk-51sGDpm5S78-unsplash.jpg";
import ProductImage3 from "../assets/images/taisiia-shestopal-S37vJnK1avE-unsplash.jpg";
import ShopNowButton from "./ShopNowButton";
import {Link} from 'react-router-dom'
const NewProducts = () => {
  const [product , setProduct] = React.useState([])
  React.useEffect(()=>{
    axios.get('http://localhost:1025/product/get').then((res)=>{
      setProduct(res.data.data)
      console.log(res.data.data)
    }).catch(e=>{
      console.log(e);
    })
  },[])
  const newProducts = [
    {
      id: 1,
      name: "Product 2",
      image: ProductImage1,
      price: "$20",
    },
    {
      id: 2,
      name: "Product 3",
      image: ProductImage2,
      price: "$30",
    },
    {
      id: 3,
      name: "Product 4",
      image: ProductImage3,
      price: "$10",
    },
    
  ];
  return (
    <div className="mt-16 py-10 px-16 w-full h-auto bg-[#1D1D1D]">
      <h1 className="text-center text-white text-4xl font-bold">
        New Products
      </h1>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {/* Products Loop */}
        {product.slice(0,4).map((newProduct) => (
         <Link to={`/productview/${newProduct._id}`}>
         <ProductCard
           key={newProduct._id}
           name={newProduct.name}
           image={newProduct.image}
           price={newProduct.price}
         />
         </Link>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <ShopNowButton buttonText="Shop All" />
      </div>
    </div>
  );
};

export default NewProducts;
