import axios from "axios";
import { useEffect, useState, useContext } from "react";
import UserContext from "../components/UserContext";
import { v4 } from "uuid";
import { addItem } from "../redux.jsx/slices/cartSlice";
import { useDispatch } from "react-redux";

export default function MyOrders() {
    const [ordersData, updateData] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user.loggedIn) {
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/productOrders/ordersData`, { email: user.email }, {
                headers: { "Content-Type": "application/json" }, withCredentials: true
            }).then((resp) => {
                if (resp.data.success) {
                    updateData(resp.data.data);
                }
            }).catch((resp) => {
                console.log(resp);
            });
        }
    }, [user]);

    let dispatch = useDispatch();

    const handleAddToCart = (productItem) => {
        dispatch(addItem(productItem));
    };


    return (
        <div className="card">
            <div className="mb-6">
                <h1 className="mb-0">Your Orders</h1>
            </div>
            <div>
                {ordersData.map((data) => {
                    return (
                        <div key={v4()}>
                            <div className="fs-3 card-header bg-dark text-white border-bottom d-flex justify-content-between align-items-center">
                                <span className="ms-2">Total Price: ₹{data.totalPrice}</span>
                                <span className="ms-2">Ordered on {data.date}</span>
                            </div>
                            {data.orderData.map((orderData) => {
                                return (
                                    <div key={v4()} className="row justify-content-between align-items-center border border-dark mx-0">
                                        <div className="col-lg-8 col-12">
                                            <div className="d-md-flex">
                                                <div>
                                                    <img src={orderData.images?.[0]?.url || ""} alt="" className="img-4by3-xl rounded" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                                </div>
                                                <div className="ms-md-4 mt-2 mt-md-0">
                                                    <h5 className="mb-1">
                                                        {orderData.name}
                                                    </h5>
                                                    <span>Quantity: <span className="text-dark mx-2">{orderData.qty}</span></span>
                                                    {orderData.category == "garments" && <span>size: <span className="text-dark">{orderData.size}</span></span>
                                                    }
                                                    <div className="mt-3">
                                                        <h4>₹{orderData.finalPrice}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-12 d-grid">
                                            <button onClick={() => handleAddToCart(orderData)} className="btn btn-dark mb-2">Buy again</button>
                                        </div>
                                    </div>
                                );
                            })}
                            <br />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
