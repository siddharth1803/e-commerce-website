import { Link, useNavigate } from "react-router-dom"
import Carousel from "./Carousel"


export default function Heading({ productCategories }) {
    return (<>
        <div className=" bg-body-secondary">
            <div className="d-flex" >
                {productCategories.slice(0, 10).map((items, index) => {
                    return (<div key={index} className="col">
                        <Link to={"/productList"} state={items.category} className="border-0 d-block text-center text-decoration-none">
                            <img src={items.imageUrl} className="img-fluid " alt="Grocery" style={{ width: "80px", height: "80px" }} />
                            <span className="text-dark d-block">{items.name}</span>
                        </Link>
                    </div>)
                })}
            </div>
        </div>
        <div>
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-secondary">
                <div className="row">
                    <div className="col-md-6 p-lg-5 my-5 text-md-start text-center">
                        <h1 className="display-4 fst-italic">A one stop location for all your requirements</h1>
                        <p className="lead my-3">Want to buy electroics, garments, groceries, vegetables or fruits we got you covered</p>
                    </div>
                    <div className="col-md-6 ">
                        <Carousel />
                    </div>
                </div>
            </div>
        </div>

    </>)
}