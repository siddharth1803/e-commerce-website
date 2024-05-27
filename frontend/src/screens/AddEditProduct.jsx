import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function AddEditProduct() {

    const location = useLocation();
    const { state } = location;
    const productItem = state ? state.productItem : null
    const [imgs, setImgs] = useState([]);
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    const [checked, setChecked] = useState([])


    useEffect(() => {
        if (productItem) {
            setChecked(productItem.sizes || [])
            setImgs(productItem.images || []);
            productItem.material = productItem.material ? productItem.material : ""
            delete productItem.images;
            delete productItem.reviews;
        }
    }, [productItem]);

    let initialState = {
        name: "",
        category: "",
        features: [""],
        price: "",
        description: "",
        warrantyInfo: "",
        specifications: [""],
        brand: "",
        color: "",
        material: "",
        sizes: [],
    }
    let startData = productItem || initialState;

    const [productCategories, updateProductCategories] = useState([]);
    const [productDetails, updateProductDetails] = useState(startData);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/productCategories`)
            .then((resp) => {
                updateProductCategories(resp.data);
            }).catch((err) => {
                updateProductCategories([]);
            });
    }, []);

    const updateFieldValues = (e) => {
        updateProductDetails((prevVal) => {
            return { ...prevVal, [e.target.name]: e.target.value };
        });
    }

    const updateListValues = (index, value, name) => {
        updateProductDetails((prevVal) => {
            const newVal = [...prevVal[name]];
            newVal[index] = value;
            return { ...prevVal, [name]: newVal };
        });
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        updateProductDetails(prevVal => {
            return { ...prevVal, [name]: files };
        });
    }

    const addNewItem = (item) => {
        updateProductDetails((prevVal) => {
            return {
                ...prevVal,
                [item]: [...(prevVal[item] || []), ""]
            };
        });
    };

    const removeItem = (item) => {
        if (productDetails[item].length === 1) return;

        updateProductDetails((prevVal) => {
            const newData = [...prevVal[item]];
            newData.pop();
            return {
                ...prevVal,
                [item]: newData
            };
        });
    };

    const addRemoveItem = (e, key) => {
        if (e.target.checked) {
            if (key == "sizes") {
                setChecked(prevVal => {
                    return [...prevVal, e.target.value]
                })
            }
            updateProductDetails(prevVal => {
                let newData = { ...prevVal }
                if (newData[key]) {
                    newData[key].push(e.target.value)
                }
                else {
                    newData[key] = [e.target.value]
                }
                return newData
            })
        }
        else {
            if (key == "sizes") {
                setChecked(prevVal => {
                    return [...prevVal].filter(val => val != e.target.value)
                })
            }
            updateProductDetails(prevVal => {
                let newData = { ...prevVal }
                newData[key] = newData[key].filter(val => val != e.target.value)
                return newData
            })
        }
    }

    const submitAction = (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (const key in productDetails) {
            if (key === 'images') {
                for (let i = 0; i < productDetails.images.length; i++) {
                    formData.append('images', productDetails.images[i]);
                }
            }
            else if (key === "features") {
                for (let i = 0; i < productDetails.features.length; i++) {
                    formData.append('features', productDetails.features[i]);
                }
            }
            else if (key === "specifications") {
                for (let i = 0; i < productDetails.specifications.length; i++) {
                    formData.append('specifications', productDetails.specifications[i]);
                }
            }
            else if (key === "deleteImages") {
                for (let i = 0; i < productDetails.deleteImages.length; i++) {
                    formData.append('deleteImages', productDetails.deleteImages[i]);

                }
            }
            else if (key === "sizes") {
                for (let i = 0; i < productDetails.sizes.length; i++) {
                    formData.append('sizes', productDetails.sizes[i]);

                }
            }
            else {
                formData.append(key, productDetails[key]);
            }
        }
        if (!productItem) {
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/productItems/createProduct`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            }).then((resp) => {
                if (resp.data.success) {
                    navigate("/");
                }
            }).catch((resp) => {
                console.log(resp);
            });
        } else {
            formData.append('id', productItem._id)
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/productItems/editProduct`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            }).then((resp) => {
                if (resp.data.success) {
                    navigate("/");
                }
            }).catch((resp) => {
                console.log(resp);
            });
        }
    }

    return (
        <div className="container card">
            <form onSubmit={submitAction} encType="multipart/form-data">
                <div
                    className="form-group m-4">
                    <label className="d-block card-header bg-dark bg-gradient text-white"
                        htmlFor="name">Name</label>
                    <input
                        onChange={updateFieldValues}
                        value={productDetails.name}
                        type="text"
                        className="form-control"
                        id="name"
                        name="name" />
                </div>
                <div
                    className="form-group m-4">
                    <label className="d-block card-header bg-dark bg-gradient text-white"
                        htmlFor="color">Color</label>
                    <input
                        onChange={updateFieldValues}
                        value={productDetails.color}
                        type="text"
                        className="form-control"
                        id="color"
                        name="color" />
                </div>
                <div
                    className="form-group m-4">
                    <label className="d-block card-header bg-dark bg-gradient text-white"
                        htmlFor="color">Material</label>
                    <input
                        onChange={updateFieldValues}
                        value={productDetails.material}
                        type="text"
                        className="form-control"
                        id="material"
                        name="material" />
                </div>
                <div
                    className="form-group m-4">
                    <label className="d-block card-header bg-dark bg-gradient text-white"
                        htmlFor="brand">Brand</label>
                    <input
                        onChange={updateFieldValues}
                        value={productDetails.brand}
                        type="text"
                        className="form-control"
                        id="brand"
                        name="brand" />
                </div>
                <div
                    className="form-group m-4">
                    <label
                        className="d-block card-header bg-dark bg-gradient text-white"
                        htmlFor="price">Price</label>
                    <input
                        onChange={updateFieldValues}
                        value={productDetails.price}
                        type="text"
                        className="form-control"
                        id="price" name="price" />
                </div>
                <div
                    className="form-group m-4">
                    <label
                        className="d-block card-header bg-dark bg-gradient text-white"
                        htmlFor="description">Description</label>
                    <input
                        onChange={updateFieldValues}
                        value={productDetails.description}
                        type="text"
                        className="form-control" id="description" name="description" />
                </div>
                <div
                    className="form-group m-4">
                    <label
                        className="d-block card-header bg-dark bg-gradient text-white"
                        htmlFor="images">Product Images</label>
                    <input type="file"
                        className="form-control"
                        id="images"
                        name="images"
                        onChange={handleFileChange}
                        multiple />
                </div>
                <div
                    className="form-group m-4">
                    <label
                        className="d-block card-header bg-dark bg-gradient text-white"
                        htmlFor="features">Features</label>
                    {productDetails.features.map((desc, index) => (
                        <div key={index} className="d-flex mb-2">
                            <input
                                onChange={(e) => updateListValues(index, e.target.value, "features")}
                                value={desc}
                                className="form-control" name="features" />
                            <RemoveIcon
                                type="button"
                                onClick={() => removeItem("features")}>Remove
                            </RemoveIcon>
                            <AddIcon
                                type="button"
                                onClick={() => addNewItem("features")}>Add
                            </AddIcon>
                        </div>
                    ))}

                </div>
                <div
                    className="form-group m-4">
                    <label
                        className="d-block card-header bg-dark bg-gradient text-white"
                        htmlFor="category">Product Category</label>
                    <select
                        className="form-select"
                        id="productcategories"
                        name="category"
                        value={productDetails.category}
                        onChange={updateFieldValues}>
                        {productCategories.map(product => (
                            <option key={product._id} value={product.category}>{product.name}</option>
                        ))}
                    </select>
                </div>
                {productDetails.category == "garments" && <div className="form-group m-4">
                    <label className="d-block card-header bg-dark bg-gradient text-white" htmlFor="price">Select Sizes</label>
                    <div className="d-flex">
                        {sizes.map((item, index) => {

                            return (checked.includes(item) &&
                                <div className="mx-2" key={index}>
                                    <input className="form-check-input border border-danger"
                                        value={item}
                                        checked
                                        onChange={(e) => addRemoveItem(e, "sizes")}
                                        type="checkbox" />
                                    <label htmlFor="">{item}</label>
                                </div>
                            );
                        })}
                        {sizes.map((item, index) => {

                            return (!checked.includes(item) &&
                                <div className="mx-2" key={index}>
                                    <input className="form-check-input border border-danger"
                                        value={item}
                                        onChange={(e) => addRemoveItem(e, "sizes")}
                                        type="checkbox" />
                                    <label htmlFor="">{item}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>}

                {
                    ["mobiles", "electronics", "appliances", "two_wheelers"].includes(productDetails.category) &&
                    <div>
                        <div className="form-group m-4">
                            <label
                                className="d-block card-header bg-dark bg-gradient text-white"
                                htmlFor="warrantyInfo">Warranty Info</label>
                            <input
                                onChange={updateFieldValues}
                                value={productDetails.warrantyInfo}
                                type="text"
                                className="form-control" id="warrantyInfo" name="warrantyInfo" />
                        </div>
                        <div
                            className="form-group m-4">
                            <label
                                className="d-block card-header bg-dark bg-gradient text-white"
                                htmlFor="specifications">Specifications</label>
                            {productDetails.specifications.map((spec, index) => (
                                <div key={index} className="d-flex mb-2">
                                    <input
                                        onChange={(e) => updateListValues(index, e.target.value, "specifications")}
                                        value={spec}
                                        className="form-control" name="specification" />
                                    <RemoveIcon
                                        type="button"
                                        onClick={() => removeItem("specifications")}>Remove
                                    </RemoveIcon>
                                    <AddIcon
                                        type="button"
                                        onClick={() => addNewItem("specifications")}>Add
                                    </AddIcon>
                                </div>
                            ))}

                        </div>
                    </div>
                }
                {productItem && <div className="form-group m-4">
                    <label className="d-block card-header bg-dark bg-gradient text-white" htmlFor="price">Select images to delete</label>
                    <div className="d-flex">
                        {imgs.map((item, index) => {
                            return (
                                <div className="mx-2" key={index}>
                                    <img className="img-thumbnail" src={item.url} style={{ width: "100px", height: "100px", objectFit: "cover" }} alt="Image" />
                                    <input className="form-check-input border border-danger" value={item._id} onChange={(e) => addRemoveItem(e, "deleteImages")} type="checkbox" />
                                </div>
                            );
                        })}
                    </div>
                </div>}

                <button type="submit" className="btn btn-primary m-4">Submit</button>
            </form>
        </div>
    );
}