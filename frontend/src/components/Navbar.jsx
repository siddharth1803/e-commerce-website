import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useState } from "react";
import Modal from "./Modal";
import Cart from "../screens/Cart";
import UserContext from "./UserContext";
import { useSelector } from "react-redux";

export default function Navbar() {
    const { user } = useContext(UserContext);

    const [cartView, setCartView] = useState(false);
    let data = useSelector(state => state.cart)
    const [query, updateQuery] = useState("")
    const navigate = useNavigate()

    function changeCardView() {
        setCartView(false);
    }


    const searchResult = (e) => {
        e.preventDefault()
        navigate('/search', { state: query });

    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand fs-2" to="/">OneStore</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item active">
                        <Link className="nav-link active fs-5" to="/">Home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link active fs-5" to="/myorders">My Orders</Link>
                    </li>
                    {user.loggedIn && <li className="nav-item active">
                        <Link className="nav-link active fs-5" to="/addeditproduct">Add Product</Link>
                    </li>}
                    <li className="nav-item active">
                        <div className="d-flex m-1">
                            <form onSubmit={searchResult}>
                                <input className="form-control me-2 border border-success" type="search"
                                    placeholder="Search" aria-label="Search" value={query} onChange={(e) => { updateQuery(e.target.value) }} />
                            </form>
                        </div>
                    </li>
                </ul>
                <div className="d-flex c">
                    <div className="btn bg-white text-success mx-1" onClick={() => setCartView(true)}>
                        <ShoppingCartIcon /> Cart <Badge pill bg="danger">{data.length}</Badge>
                    </div>
                    {cartView && (
                        <Modal onClose={() => setCartView(false)}>
                            <Cart changeCardView={changeCardView} />
                        </Modal>
                    )}
                    {!user.loggedIn ? (
                        <>
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
                        </>
                    ) : (
                        <Link className="btn bg-white text-success mx-1" to="/logout">LogOut</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
