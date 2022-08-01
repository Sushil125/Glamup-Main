import React, { useState } from "react";
import axios from "axios";
import SearchBarSection from "./Search/SearchBarSection";
import Navbar from "./Navbar";

const CategoryPage = () => {
    const [product, setProduct] = React.useState([])
    React.useEffect(() => {
        axios.get('http://localhost:1025/product/get').then((res) => {
            setProduct(res.data.data)
            console.log(res.data.data)
        }).catch(e => {
            console.log(e);
        })
    }, [])
    const Categories = [{
        id: 1,
        title: "Lorem epsum Lipstick",
        price: 2000,
        catergory: "Lipstick",
        image: "../image/lips1.jpg"
    },
    {
        id: 2,
        title: "jin-son nail polish",
        price: 410,
        catergory: "Nail Polish",
        image: "../image/np1.png"
    },
    {
        id: 3,
        title: "Cetaphil cleanser",
        price: 510,
        catergory: "Cleansers",
        image: "../image/c1.webp"
    },
    {
        id: 4,
        title: "e.l.f face cream",
        price: 410,
        catergory: "Moisturizers",
        image: "../image/m1.webp"
    }, {
        id: 5,
        title: "Mock up Lipstick",
        price: 910,
        catergory: "Lipstick",
        image: "../image/lips3.jpg"
    },

    ]
    const [data, setData] = useState(product);
    const filterResult = (catItem) => {
        const result = product.filter((curData) => {
            return curData.catergory === catItem;
        });
        setData(result);
    }
    return (
        <div className="w-full h-screen p-10">
            <Navbar />
            <SearchBarSection />
            <h1 className="text-center text-info">Let's Glam up</h1>
            <div className="container-fluid mx-2">
                <div className="row mt-5 mx-2 pb-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        <button className="flex items-center justify-center h-44 bg-emerald-500 rounded-[35px] rounded-br-none text-white text-3xl" onClick={() => filterResult('Lipstick')}>Lipstick</button>
                        <button className="flex items-center justify-center h-44 bg-emerald-500 rounded-[35px] rounded-br-none text-white text-3xl" onClick={() => filterResult('Nail Polish')}>Nail Polish</button>
                        <button className="flex items-center justify-center h-44 bg-emerald-500 rounded-[35px] rounded-br-none text-white text-3xl" onClick={() => filterResult('Moisturizers')}>Moisturizers</button>
                        <button className="flex items-center justify-center h-44 bg-emerald-500 rounded-[35px] rounded-br-none text-white text-3xl" onClick={() => filterResult('Skin Care')}>Skin Care</button>
                        <button className="flex items-center justify-center h-44 bg-emerald-500 rounded-[35px] rounded-br-none text-white text-3xl" onClick={() => filterResult('Cleansers')}>Cleansers</button>
                        <button className="flex items-center justify-center h-44 bg-emerald-500 rounded-[35px] rounded-br-none text-white text-3xl" onClick={() => setData(product)}>All</button>
                    </div>
                    <div className="col-md-9 mt-5">
                        <div className="row">
                            {data.map((product) => {
                                return (
                                    <>
                                        <div className="col-md-4 mb-4" key={product.id}>
                                            <div className="card">

                                                <div className="card-body">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <p>Price : ${product.price}</p>
                                                    <p className="card-text">{product.description}</p>
                                                    <button className="btn btn-dark">view</button>
                                                </div>
                                            </div>
                                        </div></>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CategoryPage;
