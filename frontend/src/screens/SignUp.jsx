import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../components/UserContext";


export default function SignUp() {
    const { login } = useContext(UserContext);

    const [fieldValues, setValue] = useState({
        name: "",
        password: "",
        email: "",
        location: "",
        username: ""
    });
    const navigate = useNavigate()


    const updatefieldValues = (e) => {
        setValue(prevValue => {
            return { ...prevValue, [e.target.name]: e.target.value }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/createUser`, fieldValues, {
            headers: { "Content-Type": "application/json" }, withCredentials: true
        }).then((resp) => {
            if (resp.data.success) {
                login({ email: fieldValues.email, loggedIn: true, userType: resp.data.type })
                navigate("/")
            }
        }).catch((resp) => {
            console.log(resp)
        })
    }

    return (
        <div className="container m-5">
            <form method="post" action={`${import.meta.env.VITE_API_BASE_URL}/createUser`}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" name="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Email" name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" className="form-control" id="location" placeholder="Location" name="location" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className="m-3 btn btn-success">Already a User</Link>
            </form>
        </div>)
}