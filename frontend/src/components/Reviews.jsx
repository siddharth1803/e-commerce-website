import { Rating } from "@mui/material"
import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "./UserContext";


export default function Reviews({ productItem, updateRating }) {
    const [value, setValue] = useState(0);
    const [comment, updateComment] = useState("")
    let ratingArray = Array(5).fill(0)
    const { user } = useContext(UserContext);


    for (let review of productItem.reviews) {
        if (parseInt(review.rating) == 5)
            ratingArray[0] += 1
        else if (parseInt(review.rating) >= 4 && parseInt(review.rating) < 5)
            ratingArray[1] += 1
        else if (parseInt(review.rating) >= 3 && parseInt(review.rating) < 4)
            ratingArray[2] += 1
        else if (parseInt(review.rating) >= 2 && parseInt(review.rating) < 3)
            ratingArray[3] += 1
        else if (parseInt(review.rating) >= 1 && parseInt(review.rating) < 2)
            ratingArray[4] += 1
    }


    const addReview = () => {
        if (comment == "" || value == 0) {
            return
        }
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/comments/addComment`, { body: comment, id: productItem._id, rating: value }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }).then((resp) => {
            if (resp.data.success) {
                updateComment("")
                setValue(0)
                updateRating()
            }
        }).catch((resp) => {
            console.log(resp);
            alert("error")
        });
    };

    const handleChange = (e) => {
        updateComment(e.target.value)
    };

    const rating = (productItem.reviews.reduce((total, sum) => {
        return total + parseInt(sum.rating)
    }, 0)) / productItem.reviews.length

    return (<div>
        <div className="container m-5">
            <div className="row">
                <div className="col-lg-4 col-md-5 col-12 mb-4 mb-lg-0 pr-lg-6">
                    <div className="mb-6">
                        <h4 className="mb-3">Customer reviews</h4>
                        <Rating name="read-only" value={rating} precision={0.5} readOnly />

                        <span className="h5">
                            {rating ? rating.toFixed(1) : 0} out of 5</span>
                        <p className="font-14">{productItem.reviews.length} reviews</p>

                        {ratingArray.map((item, index) => {
                            return (<div key={index} className="row align-items-center mb-1 ">
                                <div className="col-md-2 col-2 pr-0">
                                    <div className="font-12 text-dark">{5 - index} Star</div>
                                </div>
                                <div className="col-md-8 col-8 pr-2">
                                    <div className="progress" style={{ height: '8px' }}>
                                        <div className="progress-bar  bg-warning" role="progressbar"
                                            style={{ width: `${Math.trunc(100 * item / productItem.reviews.length)}%` }} />
                                    </div>
                                </div>
                                <div className="col-md-2 col-2">
                                    <div className="font-12 text-primary">{productItem.reviews.length ? Math.trunc(100 * item / productItem.reviews.length) : 0}%</div>
                                </div>
                            </div>)
                        })}

                    </div>
                    {user.loggedIn && <div>
                        <h4 className="mb-1">Review this item</h4>
                        <p className="font-12 ">Share your thoughts with other customers</p>

                        <div className="mb-3">
                            <Rating
                                name="simple-controlled"
                                value={value}
                                precision={1}
                                required
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <textarea value={comment} onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
                        </div>
                        <br />
                        <button onClick={addReview} className="btn btn-primary btn-block">Write A Review</button>
                    </div>}
                </div>
                <div className="col-lg-8 col-md-7 col-12">
                    {productItem.reviews.map((item, index) => {
                        return (<div key={index} className="mb-4 pb-4 border-bottom">
                            <div className="d-flex mb-3 align-items-center">
                                <img src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/12.webp"
                                    alt=""
                                    className="rounded-circle avatar-lg" style={{ width: "40px" }} />
                                <div className="ml-2">
                                    <h5 className="mb-1">
                                        {item.author.name}
                                    </h5>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div>
                                    <Rating name="read-only" value={item.rating} precision={0.5} readOnly />

                                </div>
                                <div className="h5">{item.body}</div>
                            </div>

                        </div>)
                    })}

                </div>
            </div>

        </div>
    </div>)
}