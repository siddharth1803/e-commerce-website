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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={updatefieldValues} className="form-control" id="name" placeholder="Name" name="name" value={fieldValues.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" onChange={updatefieldValues} className="form-control" id="username" placeholder="Username" name="username" value={fieldValues.username} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={updatefieldValues} className="form-control" id="email" placeholder="Email" name="email" value={fieldValues.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" onChange={updatefieldValues} className="form-control" id="location" placeholder="Location" name="location" value={fieldValues.location} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={updatefieldValues} className="form-control" id="password" placeholder="Password" name="password" value={fieldValues.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/login" className="m-3 btn btn-success">Already a User</Link>
            </form>
        </div>)
}