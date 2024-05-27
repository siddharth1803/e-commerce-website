import { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import { useDispatch } from "react-redux";
import { addItem } from "../redux.jsx/slices/cartSlice";
import { Rating } from "@mui/material";

export default function ProductsList({ productItem }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    let dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addItem({
            _id: productItem._id,
            name: productItem.name,
            category: productItem.category,
            img: productItem.img,
            price: productItem.price,
            qty: 1,
            finalPrice: productItem.price,
            images: productItem.images
        }));
    };

    const handleDelete = (id) => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/productItems/deleteProduct`, { id }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }).then((resp) => {
            if (resp.data.success) {
                navigate("/");
            }
        }).catch((resp) => {
            console.log(resp);
        });
    };

    return (
        <>
            <section style={{ backgroundColor: "#eee" }}>
                <div className="card shadow-0 border rounded-3">

                    <div className="row">
                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                <img src={productItem.images?.[0]?.url || ""} className="w-100"
                                    style={{
                                        height: "200px",
                                        objectFit: "cover"
                                    }} />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                            <h5>{productItem.name}</h5>
                            <div className="d-flex flex-row">
                                <div>
                                    <Rating name="read-only"
                                        value={parseFloat(productItem.rating)}
                                        precision={0.5}
                                        readOnly />

                                </div>
                                <span className="ms-1" style={{ color: "#FF9529" }}>
                                    {parseFloat((productItem.rating)).toFixed(1)}

                                </span>
                                <span className="mx-2">
                                    {productItem.reviews.length}
                                </span>
                            </div>
                            <div className="mt-1 mb-0 text-muted small">
                                {productItem.features.slice(0, 2).map((item, index) => (
                                    <span key={index}><span className="text-primary"> • </span>{item}</span>
                                ))}
                            </div>
                            <div className="mt-1 mb-0 text-muted small">
                                {productItem.features.slice(2, 4).map((item, index) => (
                                    <span key={index}><span className="text-primary"> • </span>{item}</span>
                                ))}
                            </div>
                            <div className="mt-1 mb-2 text-muted small">
                                {productItem.features.slice(4, 6).map((item, index) => (
                                    <span key={index}><span className="text-primary"> • </span>{item}</span>
                                ))}
                            </div>
                            {productItem.category == "garments" && <div>Sizes: {productItem.sizes.map((item, index) =>
                                <span key={index} className="mt-1 mb-2 text-muted small">{item},</span>)}</div>}
                            <p className="text-truncate mb-4 mb-md-0">
                                {productItem.description}
                            </p>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                            <div className="d-flex flex-row align-items-center mb-1">
                                <h4 className="mb-1 me-1">₹{productItem.price}</h4>
                                <span className="text-danger"><s>₹{Math.trunc(productItem.price * 1.2)}</s></span>
                            </div>
                            <h6 className="text-success">Free shipping</h6>
                            <div className="d-flex flex-column mt-4">
                                <Link to={"/product"} state={{ productData: productItem }} className="btn btn-primary btn-sm">Details</Link>
                                <button onClick={handleAddToCart} className="btn btn-outline-primary btn-sm mt-2" type="button">
                                    Add to Cart
                                </button>
                                {user.loggedIn && user.userId == productItem.owner && <div>
                                    <Link to={"/addeditproduct"} state={{ productItem: productItem }} className="btn btn-danger btn-sm mt-2">Edit</Link>
                                    <button onClick={() => handleDelete(productItem._id)} className="btn btn-danger btn-sm mt-2" type="button">
                                        Delete
                                    </button>
                                </div>}
                            </div>
                        </div>
                    </div>

                </div>


            </section>
        </>
    );
}
