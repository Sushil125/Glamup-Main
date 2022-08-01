import ProductCard from "./ProductCard";
import React from 'react'
import ProductImage1 from "../assets/images/lina-verovaya-F39Yk-FM_fg-unsplash.jpg";
import ProductImage2 from "../assets/images/nati-melnychuk-51sGDpm5S78-unsplash.jpg";
import ProductImage3 from "../assets/images/taisiia-shestopal-S37vJnK1avE-unsplash.jpg";
import ShopNowButton from "./ShopNowButton";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [product , setProduct] = React.useState([])
  React.useEffect(()=>{
    axios.get('http://localhost:1025/product/get').then((res)=>{
      setProduct(res.data.data)
      console.log(res.data.data)
    }).catch(e=>{
      console.log(e);
    })
  },[])

  const featuredProducts = [
    {
      id: 1,
      name: "Product 1",
      image: ProductImage1,
      price: "$20",
    },
    {
      id: 2,
      name: "Product 2",
      image: ProductImage2,
      price: "$30",
    },
    {
      id: 3,
      name: "Product 3",
      image: ProductImage3,
      price: "$10",
    },
    {
      id: 4,
      name: "Product 4",
      image: ProductImage1,
      price: "$20",
    },
    {
      id: 5,
      name: "Product 5",
      image: ProductImage2,
      price: "$30",
    },
    {
      id: 6,
      name: "Product 6",
      image: ProductImage3,
      price: "$10",
    },
  ];
  return (
    <div className="mt-16 py-10 px-16 w-full h-auto bg-[#1D1D1D]">
      <h1 className="text-center text-white text-4xl font-bold">
        Featured Products
      </h1>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {/* Products Loop */}
        {product.slice(0,6).map((featuredProduct) => (
          <Link to={`/productview/${featuredProduct._id}`}>
          <ProductCard
            key={featuredProduct._id}
            name={featuredProduct.name}
            image={featuredProduct.image}
            price={featuredProduct.price}
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

export default FeaturedProducts;
