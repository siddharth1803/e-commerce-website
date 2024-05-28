import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../components/UserContext";


export default function Login() {
    const [fieldValues, setFieldValues] = useState({
        password: "",
        username: "",
    });
    const { login } = useContext(UserContext);

    const navigate = useNavigate();
    const updateFieldValues = (e) => {
        setFieldValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = async (e) => {
        navigate("/")
        // e.preventDefault();
        // axios.post(`${import.meta.env.VITE_API_BASE_URL}/loginUser`, fieldValues,
        //     { headers: { "Content-Type": "application/json" }, withCredentials: true }
        // ).then(response => {
        //     if (response.data.success) {
        //         login({ userType: response.data.type, email: response.data.email, loggedIn: true })
        //         navigate("/");
        //     }
        // }).catch(error => {
        //     console.log(error)
        // })
    };
    {/* <form>onSubmit={handleLogin} */ }

    let url = `${import.meta.env.VITE_API_BASE_URL}/loginUser`
    return (
        <div className="container m-5">
            <form method="post" action={url}>
                <div className="form-group">
                    <label htmlFor="username">Username/Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="username/email"
                        name="username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/signup" className="m-3 btn btn-success">Not a User? Sign Up</Link>
            </form>
        </div >
    );
}
