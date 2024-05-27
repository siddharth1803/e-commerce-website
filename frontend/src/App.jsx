import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Home from "./screens/Home"
import Login from "./screens/Login"
import SignUp from "./screens/SignUp"
import MyOrders from "./screens/MyOrders";
import Logout from "./screens/Logout"
import AddEditProduct from "./screens/AddEditProduct";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import ProductListResult from "./screens/ProductListResult";
import Product from "./screens/ProductPage";
import Search from "./screens/Search";


function App() {

  return (
    <>
      <UserProvider>
        <Router>
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/addeditproduct" element={<AddEditProduct />} />
              <Route path="/productList" element={<ProductListResult />} />
              <Route path="/product" element={<Product />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </UserProvider>
    </>
  )
}

export default App
