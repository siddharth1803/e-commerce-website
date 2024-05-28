import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../components/UserContext"
import Heading from "../components/Heading";

export default function Home() {
    const navigate = useNavigate()
    const [productItems, updateProductItems] = useState([])
    const [productCategories, updateProductCategoriess] = useState([])
    const { user } = useContext(UserContext);


    const getProductItems = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/productItems`)
            .then((resp) => {
                updateProductItems(resp.data)
            }).catch((err) => {
                console.log(err)
                updateProductItems([])
            })
    }
    const getProductCategories = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/productCategories`)
            .then((resp) => {
                updateProductCategoriess(resp.data)
            }).catch((err) => {
                console.log(err)
                updateProductCategoriess([])
            })
    }
    useEffect(() => {
        getProductItems()
        getProductCategories()
    }, [])

    const deleteItems = (id) => {
        updateProductItems(prevItems => {
            return prevItems.filter(item => {
                return item._id != id
            })
        })
    }


    return (<div>
        <div>
            <Heading productCategories={productCategories}></Heading>
        </div>
        {
            productCategories.map((data) => {
                return (
                    <div key={data._id}>
                        <div className='container row mb-3 '>
                            <div className=' fs-3 m-3'>
                                {data.name}
                            </div>
                            <hr id="hr-success" style={{ height: "4px" }} />
                            <div className="container px-4 px-lg-5 mt-5">
                                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                                    {productItems.filter(
                                        (items) => (items.category == data.category)).slice(0, 4)
                                        .map((item, index) => {
                                            return (
                                                <div key={index} className="col mb-5">
                                                    <div className="card h-100">
                                                        <div
                                                            className="badge bg-dark text-white position-absolute"
                                                            style={{ top: "0.5rem", right: "0.5rem" }}>
                                                            Trending
                                                        </div>
                                                        <img
                                                            className="card-img-top"
                                                            src={item.images?.[0]?.url || ""}
                                                            alt="..."
                                                            style={{ height: "200px", objectFit: "cover" }}
                                                        />
                                                        <div className="card-body p-4">
                                                            <div className="text-center">
                                                                <h5 className="fw-bolder">{item.name}</h5>
                                                                ₹{item.price}
                                                            </div>
                                                        </div>
                                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                            <div className="text-center">
                                                                <Link to={`/product?id=${item._id}&category=${item.category}`}
                                                                    className="btn btn-outline-dark mt-auto">
                                                                    View
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
    </div>)
}
