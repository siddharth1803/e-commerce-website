const express = require("express")
const router = express.Router()
const ProductCategories = require("../models/ProductCategories")

router.get("/", async (req, res) => {
    try {
        const ProductItems = await ProductCategories.find({})
        return res.json(ProductItems)
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
})

module.exports = router