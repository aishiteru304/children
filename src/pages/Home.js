import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import HomeCard from '../components/HomeCard';
import { GrPrevious, GrNext } from 'react-icons/gr'
import CardFeature from '../components/CardFeature'
import FilterProduct from '../components/FilterProduct';


export default function Home() {

    const [productData, setProductData] = useState()
    const [homeProductList, setHomeProductList] = useState()
    const [fruitFeature, setFruitFeature] = useState()
    const [categoryList, setCategoryList] = useState()
    const [filterby, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState();

    const loadingArray = new Array(4).fill(null);
    const loadingArrayFeature = new Array(10).fill(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}products`)
            .then(res => {
                setProductData(res.data)
                setHomeProductList(res.data.slice(0, 4))
                setFruitFeature(res.data.filter((el) => el.category === "fruits"))
                setCategoryList([...new Set(res.data.map((el) => el.category))])
                setDataFilter(res.data)
            })
            .catch()
    }, [])

    const slideProductRef = useRef()
    const slideCategoryRef = useRef()
    const [xDown, setXDown] = useState()
    const [xCategoryDown, setXCategoryDown] = useState()

    const nextProduct = (type) => {
        if (type === "FEATURE")
            slideProductRef.current.scrollLeft += 200;
        else
            slideCategoryRef.current.scrollLeft += 200;

    };
    const preveProduct = (type) => {
        if (type === "FEATURE")
            slideProductRef.current.scrollLeft -= 200;
        else
            slideCategoryRef.current.scrollLeft -= 200;
    }
    const handleDown = (e) => {
        setXDown(e.clientX)
    }
    const handleUp = (e) => {
        if (e.clientX < xDown) nextProduct("FEATURE")
        else preveProduct("FEATURE")
    }
    const handleCategoryDown = (e) => {
        setXCategoryDown(e.clientX)
    }
    const handleCategoryUp = (e) => {
        if (e.clientX < xCategoryDown) nextProduct("CATEGORY")
        else preveProduct("CATEGORY")
    }

    const handleFilterProduct = (category) => {
        setFilterBy(category)
        const filter = productData.filter(
            (el) => el.category.toLowerCase() === category.toLowerCase()
        );
        setDataFilter(() => {
            return [...filter];
        });
    };


    return (
        <div className="p-2 md:p-4">
            <div className="md:flex gap-4 py-2">
                <div className="md:w-1/2">
                    <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
                        <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                            className="h-7"
                            alt=''
                        />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold py-3">
                        The Fasted Delivery in{" "}
                        <span className="text-red-600 text-">Your Home</span>
                    </h2>
                    <p className="py-3 text-base ">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries
                    </p>
                    <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
                        Order Now
                    </button>
                </div>
                <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
                    {homeProductList && homeProductList[0] ?
                        homeProductList.map((el) => {
                            return (
                                <HomeCard
                                    key={el._id}
                                    image={el.image}
                                    name={el.name}
                                    price={el.price}
                                    category={el.category}
                                />
                            );
                        })
                        :
                        loadingArray.map((el, index) => {
                            return <HomeCard key={index + "loading"} loading={"Loading..."} />;
                        })
                    }

                </div>
            </div>

            <div className="">
                <div className="flex w-full items-center">
                    <h2 className="font-bold text-2xl text-slate-800 mb-4">
                        Fresh Fruits
                    </h2>
                    <div className="ml-auto flex gap-4">
                        <button
                            className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
                            onClick={() => preveProduct("FEATURE")}
                        >
                            <GrPrevious />
                        </button>
                        <button
                            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
                            onClick={() => nextProduct("FEATURE")}
                        >
                            <GrNext />
                        </button>
                    </div>
                </div>

                <div
                    className="flex gap-5 scroll-smooth transition-all overflow-hidden "
                    ref={slideProductRef}
                    onMouseDown={(e) => handleDown(e)}
                    onMouseUp={(e) => handleUp(e)}
                >
                    {fruitFeature && fruitFeature[0]
                        ? fruitFeature.map((el) => {
                            return (
                                <CardFeature
                                    key={el._id + "vegetable"}
                                    id={el._id}
                                    name={el.name}
                                    category={el.category}
                                    price={el.price}
                                    image={el.image}
                                />
                            );
                        })
                        : loadingArrayFeature.map((el, index) => (
                            <CardFeature loading="Loading..." key={index + "cartLoading"} />
                        ))}
                </div>
            </div>

            <div className="my-5">
                <h2 className="font-bold text-2xl text-slate-800 mb-4">All Products</h2>

                <div className="flex gap-4 scroll-smooth transition-all md:justify-center overflow-hidden justify-between" ref={slideCategoryRef}
                    onMouseDown={e => handleCategoryDown(e)}
                    onMouseUp={e => handleCategoryUp(e)}
                >
                    {categoryList && categoryList[0] ? (
                        categoryList.map((el) => {
                            return (
                                <FilterProduct
                                    category={el}
                                    key={el}
                                    isActive={el.toLowerCase() === filterby.toLowerCase()}
                                    onClick={() => handleFilterProduct(el)}
                                />
                            );
                        })
                    ) : (
                        <div className="min-h-[150px] flex justify-center items-center">
                            <p>Loading...</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap justify-center gap-4 my-4">
                    {dataFilter && dataFilter[0]
                        ? dataFilter.map((el) => {
                            return (
                                <CardFeature
                                    key={el._id}
                                    id={el._id}
                                    image={el.image}
                                    name={el.name}
                                    category={el.category}
                                    price={el.price}
                                />
                            );
                        })
                        :
                        loadingArrayFeature.map((el, index) => (
                            <CardFeature loading="Loading..." key={index + "allProduct"} />
                        ))}
                </div>
            </div>
        </div>


    )
}
