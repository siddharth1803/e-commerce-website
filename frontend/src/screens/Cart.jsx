import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import UserContext from "../components/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, emptyCart } from "../redux.jsx/slices/cartSlice"


export default function Cart({ changeCardView }) {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    let data = useSelector(state => state.cart)


    if (data.length === 0) {
        return (
            <div>
                <div className='container m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
            </div>
        )
    }
    let dispatch = useDispatch()

    const handleRemoveToCart = (index) => {
        dispatch(removeItem(index))
    }
    const handleEmptyCart = async () => {
        dispatch(emptyCart())
    }
    let totalPrice = data.reduce((total, product) => total + parseInt(product.finalPrice), 0)

    const checkoutOrder = async () => {
        if (!user.loggedIn) {
            navigate("/login")
            changeCardView()
            return
        }
        let reqBody = {
            email: user.email,
            totalPrice: totalPrice,
            orderData: data
        }

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/productOrders/order`, reqBody, {
            headers: { "Content-Type": "application/json" }, withCredentials: true
        }).then((resp) => {
            handleEmptyCart()

        }).catch((resp) => {
            console.log(resp)
            // alert("user must be logged in")
        })
    }


    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Image</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Size</th>
                            <th scope='col' >Category</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' >Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                            <tr key={index}>
                                <th scope='row' >{index + 1}</th>
                                <td ><img src={product.images?.[0]?.url || ""} style={{ textAlign: "center", width: "100px", height: "100px", objectFit: "fill" }} /></td>
                                <td >{product.name}</td>
                                <td>{product.qty}</td>
                                <td>{product.size}</td>
                                <td>{product.category}</td>
                                <td>{product.finalPrice}</td>
                                <td ><button type="button" onClick={() => handleRemoveToCart(index)} className="btn p-0"><DeleteIcon /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1>
                    <div>
                        <button className='btn bg-success' onClick={checkoutOrder}> Check Out </button>
                        <button className='btn bg-danger' onClick={handleEmptyCart}> Empty Cart </button>
                    </div>
                </div>
            </div>
        </div>
    )
}