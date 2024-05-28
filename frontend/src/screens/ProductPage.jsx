import { Link, useLocation } from "react-router-dom";
import Reviews from "../components/Reviews";
import { Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../redux.jsx/slices/cartSlice";
import UserContext from "../components/UserContext";


export default function Product() {
    let dispatch = useDispatch();
    const location = useLocation();

    let { search } = location;
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get("id")

    const category = queryParams.get("category")
    const { user } = useContext(UserContext);


    const [productItems, updateProductItems] = useState([])
    const [productItem, updateProductItem] = useState({})
    const [size, updateSize] = useState(productItem.category == "garments" ? productItem.sizes[0] : "")

    const getProductItems = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/productItems`, {
            params: {
                category: category
            }
        })
            .then((resp) => {
                updateProductItems(resp.data)
            }).catch((err) => {
                console.log(err)
                updateProductItems([])
            })
    }
    const getProduct = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/productItems/product`, {
            params: {
                id: id
            }
        })
            .then((resp) => {
                updateProductItem(resp.data)
            }).catch((err) => {
                console.log(err)
                updateProductItem({})
            })
    }
    useEffect(() => {
        getProductItems()
        getProduct()
        window.scrollTo(0, 0);
    }, [id])
    const updateRating = () => {
        getProduct()
    }
    const rating = (arr) => {
        if (Object.keys(arr).length == 0)
            return 0
        let sum = (arr.reviews.reduce((total, sum) => {
            return total + parseInt(sum.rating)
        }, 0)) / arr.reviews.length
        if (isNaN(sum))
            return 0
        return sum
    }
    const handleAddToCart = () => {
        dispatch(addItem({
            _id: productItem._id,
            name: productItem.name,
            category: productItem.category,
            img: productItem.img,
            price: productItem.price,
            qty: 1,
            finalPrice: productItem.price,
            images: productItem.images,
            size: size
        }));
    };
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-6">
                            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                                <div className="carousel-inner " id='carousel'>
                                    <div className="carousel-item active" >
                                        <img src={productItem.images?.[0]?.url || ""} className="d-block w-100  " style={{ filter: "brightness(70%)", height: "450px", objectFit: "cover" }} alt="..." />
                                    </div>
                                    {productItem.images && productItem.images.slice(1).map((item, index) => {
                                        return (<div key={index} className="carousel-item" >
                                            <img src={item.url} className="d-block w-100  " style={{ filter: "brightness(70%)", height: "450px", objectFit: "cover" }} alt="..." />
                                        </div>)
                                    })}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    {productItem.name}
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2 d-flex align-items-center">
                                        <Rating name="read-only"
                                            value={rating(productItem)}
                                            precision={0.5} readOnly />
                                        <span className="ms-1">
                                            {rating(productItem)}
                                        </span>
                                    </div>

                                    <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{productItem.reviews ? productItem.reviews.length : 0} reviews</span>
                                    <span className="text-success ms-2">In stock</span>
                                </div>
                                <div className="mb-3">
                                    <span className="h5">₹{productItem.price}</span>
                                    <span className="text-muted">/per item</span>
                                </div>
                                <p>
                                    {productItem.description}
                                </p>
                                <div className="row">
                                    <dt className="col-3">Type:</dt>
                                    <dd className="col-9">{productItem.category ? productItem.category.split("_")
                                        .filter(x => x.length > 0)
                                        .map((x) => (x.charAt(0).toUpperCase() + x.slice(1)))
                                        .join(" ") : ""}</dd>
                                    <dt className="col-3">Color</dt>
                                    <dd className="col-9">{productItem.color}</dd>
                                    <dt className="col-3">Material</dt>
                                    <dd className="col-9">{productItem.material}</dd>
                                    <dt className="col-3">Brand</dt>
                                    <dd className="col-9">{productItem.brand}</dd>
                                </div>
                                <hr />
                                {productItem.category == "garments" && <div className="row mb-4">
                                    <div className="col-md-4 col-6">
                                        <label className="mb-2">Size</label>
                                        <select className="form-select border border-secondary"
                                            name="size"
                                            value={size}
                                            onChange={(e) => { updateSize(e.target.value) }}
                                            style={{ height: "35px" }}>
                                            {productItem.sizes.map((item, index) => {
                                                return (
                                                    <option key={index} value={item}>{item}</option>
                                                )
                                            })}

                                        </select>
                                    </div>

                                </div>}
                                {/* <button className="btn btn-warning shadow-0 mx-2"> Buy now </button> */}
                                <button onClick={handleAddToCart} className="btn btn-primary shadow-0 mx-2"> Add to cart </button>
                                {user.loggedIn && user.userId == productItem.owner &&
                                    <Link to={"/addeditproduct"}
                                        state={{ productItem }}
                                        className="btn btn-danger shadow-0">Edit</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* stating here----------------------------------- */}
            <>
                {/* content */}
                <section className="bg-light border-top py-4">
                    <div className="container">
                        <div className="row">
                            <div className=" mb-4">
                                <div className="border rounded-2 px-3 py-2 bg-white">
                                    {/* Pills navs */}
                                    <ul
                                        className="nav nav-pills nav-justified mb-3"
                                        id="ex1"
                                        role="tablist"
                                    >
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link active w-100"
                                                id="ex1-tab-1"
                                                data-bs-toggle="pill"
                                                data-bs-target="#ex1-pills-1"
                                                type="button"
                                                role="tab"
                                                aria-controls="ex1-pills-1"
                                                aria-selected="true"
                                            >
                                                Specification
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link w-100"
                                                id="ex1-tab-2"
                                                data-bs-toggle="pill"
                                                data-bs-target="#ex1-pills-2"
                                                type="button"
                                                role="tab"
                                                aria-controls="ex1-pills-2"
                                                aria-selected="false"
                                            >
                                                Warranty info
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link w-100"
                                                id="ex1-tab-3"
                                                data-bs-toggle="pill"
                                                data-bs-target="#ex1-pills-3"
                                                type="button"
                                                role="tab"
                                                aria-controls="ex1-pills-3"
                                                aria-selected="false"
                                            >
                                                Shipping info
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link w-100"
                                                id="ex1-tab-4"
                                                data-bs-toggle="pill"
                                                data-bs-target="#ex1-pills-4"
                                                type="button"
                                                role="tab"
                                                aria-controls="ex1-pills-4"
                                                aria-selected="false"
                                            >
                                                Seller profile
                                            </button>
                                        </li>
                                    </ul>

                                    <div className="tab-content" id="ex1-content">
                                        <div
                                            className="tab-pane fade show active"
                                            id="ex1-pills-1"
                                            role="tabpanel"
                                            aria-labelledby="ex1-tab-1">
                                            <p>
                                                {productItem.description}
                                            </p>
                                            <div className="row mb-2">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <ul className="list-group">
                                                                <li className="list-group-item list-group-item-info">Hot Features</li>
                                                                {productItem.features && productItem.features.map((item, index) => {
                                                                    return (<li key={index} className="list-group-item">{item}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div className="col-6">
                                                            <ul className="list-group">
                                                                <li className="list-group-item list-group-item-info">Specifications</li>
                                                                {productItem.specifications && productItem.specifications.map((item, index) => {
                                                                    return (<li key={index} className="list-group-item">{item}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <div
                                            className="tab-pane fade mb-2"
                                            id="ex1-pills-2"
                                            role="tabpanel"
                                            aria-labelledby="ex1-tab-2"
                                        >
                                            {productItem.warrantyInfo}
                                        </div>
                                        <div
                                            className="tab-pane fade mb-2"
                                            id="ex1-pills-3"
                                            role="tabpanel"
                                            aria-labelledby="ex1-tab-3"
                                        >
                                            Another tab content or sample information now <br />
                                            Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </div>
                                        <div
                                            className="tab-pane fade mb-2"
                                            id="ex1-pills-4"
                                            role="tabpanel"
                                            aria-labelledby="ex1-tab-4"
                                        >
                                            Some other tab content or sample information now <br />
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                            in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>

            <section className="bg-light border-top py-4">
                <div className="container">
                    <div className="row gx-4">

                        <h1 style={{ textAlign: "center", fontStyle: "oblique" }}>Related Items</h1>
                        <div className="container px-4 px-lg-5 mt-5">
                            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                                {productItems.slice(0, 4).map((productItem, index) => {
                                    return (<div key={index} className="col mb-5">
                                        <div className="card h-100">
                                            <div
                                                className="badge bg-dark text-white position-absolute"
                                                style={{ top: "0.5rem", right: "0.5rem" }}>
                                                Similar
                                            </div>
                                            <img
                                                className="card-img-top"
                                                src={productItem.images?.[0]?.url || ""}
                                                alt="..."
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                            <div className="card-body p-4">
                                                <div className="text-center">
                                                    <div className="d-flex justify-content-center small text-warning mb-2">
                                                        <Rating name="read-only" value={rating(productItem) ? rating(productItem) : 0} precision={0.5} readOnly />

                                                    </div>
                                                    <h5 className="fw-bolder">{productItem.name}</h5>
                                                    <div className="text-muted text-decoration-line-through">
                                                        ₹{Math.trunc(productItem.price * 1.2)}
                                                    </div>
                                                    ₹{productItem.price}
                                                </div>
                                            </div>
                                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                <div className="text-center">
                                                    <Link to={`/product?id=${productItem._id}&category=${productItem.category}`}
                                                        className="btn btn-outline-dark mt-auto">
                                                        View
                                                    </Link>


                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                })}

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {
                Object.keys(productItem).length && <Reviews productItem={productItem} updateRating={updateRating} />
            }
        </>
    );
}
