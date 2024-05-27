const express = require("express")
const router = express.Router()
const Rating = require("../models/Ratings")
const ProductItems = require("../models/ProductItems")

router.post("/addComment", async (req, res) => {
    try {
        const product = await ProductItems.findById(req.body.id);
        const rating = new Rating({
            body: req.body.body,
            rating: req.body.rating,
            author: req.user._id
        })
        await rating.save()
        product.reviews.push(rating)
        product.rating = (parseFloat(product.rating) * (product.reviews.length - 1) + parseInt(req.body.rating)) / product.reviews.length

        await product.save()
        return res.json({ success: true, product })
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
})

module.exports = router