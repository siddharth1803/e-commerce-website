import axios from "axios"
import { useContext, useEffect, useState } from "react"
import ProductsList from "../components/ProductsList"
import { useLocation, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import MultiRangeSlider from "multi-range-slider-react"
import UserContext from "../components/UserContext";


export default function ProductListResult() {
    const location = useLocation();
    const ratings = [0, 1, 2, 3, 4, 5]
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    const { user } = useContext(UserContext);
    let { search } = location;
    const queryParams = new URLSearchParams(search);
    const category = queryParams.get("category")

    const [productItems, updateProductItems] = useState([])

    const getProductItems = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/productItems`, {
            params: {
                category: category
            }
        })
            .then((resp) => {
                updateProductItems(resp.data)
            }).catch((err) => {
                console.log(err)
                updateProductItems([])
            })
    }
    useEffect(() => {
        getProductItems()
    }, [])

    const maxPrice = productItems.length
        ? Math.round(Math.max(...productItems.map(item => item ? parseInt(item.price) : 0)) / 10) * 10 : 1000000

    const [minValue, set_minValue] = useState(1);
    const [maxValue, set_maxValue] = useState(maxPrice);
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    const [filters, updateFilters] = useState({
        brands: [],
        sizes: [],
        ratings: [],
    })

    const updateFilter = (e, filter) => {
        if (e.target.checked) {
            updateFilters(prevVal => {
                let newVal = { ...prevVal }
                newVal[filter].push(e.target.value)
                return newVal
            })
        }
        else {
            updateFilters(prevVal => {
                let newVal = { ...prevVal }
                newVal[filter] = prevVal[filter].filter(x => x != e.target.value)
                return newVal
            })
        }
    }

    const updateMinMax = (e) => {
        if (e.target.id == "typeNumberMax") {
            if (minValue > e.target.value)
                return
            set_maxValue(e.target.value)
        }
        else
            set_minValue(e.target.value)
    }

    return (
        <div style={{ overflowX: "hidden" }} className=" m-3">
            <div className="row">
                {/* sidebar */}
                <div className="col-lg-3 col-md-4 col-12">
                    {/* Toggle button */}
                    <button
                        className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                    >
                        <span>Show filter</span>
                    </button>

                    <div
                        className="collapse card d-lg-block mb-5"
                        id="navbarSupportedContent"
                    >
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button
                                        className="accordion-button text-dark bg-light"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseTwo"
                                        aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseTwo"
                                    >
                                        Brands
                                    </button>
                                </h2>
                                <div
                                    id="panelsStayOpen-collapseTwo"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingTwo"
                                >
                                    <div className="accordion-body">
                                        <div>
                                            {[...new Set(productItems.map(item => item.brand))].map((item, index) => (
                                                <div key={index} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={item}
                                                        id={`brandCheck${index}`}
                                                        onChange={(e) => updateFilter(e, "brands")}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`brandCheck${index}`}
                                                    >
                                                        {item}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button
                                        className="accordion-button text-dark bg-light"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseThree"
                                    >
                                        Price
                                    </button>
                                </h2>
                                <div
                                    id="panelsStayOpen-collapseThree"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingThree"
                                >
                                    <div className="accordion-body">
                                        <MultiRangeSlider
                                            style={{ border: 'none', boxShadow: 'none', padding: '15px 10px' }}
                                            min={0}
                                            max={maxPrice}
                                            step={5}
                                            minValue={minValue}
                                            maxValue={maxValue}
                                            onInput={(e) => handleInput(e)}
                                            ruler={false}
                                            label={false}
                                        />
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <p className="mb-0">Min</p>
                                                <div className="form-outline">
                                                    <input
                                                        type="number"
                                                        id="typeNumberMin"
                                                        className="form-control"
                                                        value={minValue ? minValue : ""}
                                                        onChange={updateMinMax}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <p className="mb-0">Max</p>
                                                <div className="form-outline">
                                                    <input
                                                        type="number"
                                                        id="typeNumberMax"
                                                        className="form-control"
                                                        value={maxValue ? maxValue : ""}
                                                        onChange={updateMinMax}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {category === "garments" && (
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button
                                            className="accordion-button text-dark bg-light"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseFour"
                                            aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseFour"
                                        >
                                            Size
                                        </button>
                                    </h2>
                                    <div
                                        id="panelsStayOpen-collapseFour"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingFour"
                                    >
                                        <div className="accordion-body">
                                            {sizes.map((item, index) => (
                                                <div key={index} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`sizeCheck${index}`}
                                                        value={item}
                                                        onChange={(e) => updateFilter(e, "sizes")}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`sizeCheck${index}`}
                                                    >
                                                        {item}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFive">
                                    <button
                                        className="accordion-button text-dark bg-light"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseFive"
                                        aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseFive"
                                    >
                                        Ratings
                                    </button>
                                </h2>
                                <div
                                    id="panelsStayOpen-collapseFive"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="headingFive"
                                >
                                    <div className="accordion-body">
                                        {ratings.map((item, index) => (
                                            <div key={index} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item}
                                                    id={`ratingCheck${index}`}
                                                    onChange={(e) => updateFilter(e, "ratings")}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`ratingCheck${index}`}
                                                >
                                                    <Rating name="half-rating-read" defaultValue={item} precision={0.5} readOnly />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-8 col-12">
                    {(filters.brands.length === 0 && filters.sizes.length === 0 && filters.ratings.length === 0 ? productItems :
                        productItems
                            .filter(productItem => {
                                return filters.ratings.length ? filters.ratings.includes(parseInt(productItem.rating).toString()) : true
                            })
                            .filter(productItem => {
                                return filters.brands.length ? filters.brands.includes(productItem.brand) : true;
                            })
                            .filter(productItem => {
                                return filters.sizes.length ? productItem.sizes.some(size => filters.sizes.includes(size)) : true;
                            }))
                        .filter(productItem => {
                            return parseInt(productItem.price) >= minValue && parseInt(productItem.price) <= maxValue
                        })
                        .map((productItem, index) => (
                            <div key={index}>
                                <ProductsList productItem={productItem} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
