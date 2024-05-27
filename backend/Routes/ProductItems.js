const express = require("express")
const router = express.Router()
const ProductItems = require("../models/ProductItems")
const ProductCategories = require("../models/ProductCategories")
const { body, validationResult } = require("express-validator")
const { isLoggedIn, isOwner } = require("../middlewares")
const multer = require('multer')
const { storage } = require("../cloudinary/index")
const upload = multer({ storage })
const { cloudinary } = require("../cloudinary/index")




router.get("/", async (req, res) => {
    try {
        let filter = {}
        if (req.query.category)
            filter = { category: req.query.category }
        const productItems = await ProductItems.find(filter)
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                    model: "User",
                    select: "name -_id"
                }
            });
        return res.json(productItems)
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
})

router.get("/search", async (req, res) => {
    try {
        let query = req.query.q
        const regex = new RegExp(query, 'i')
        const productItems = await ProductItems.find({
            $or:
                [{ name: regex }, { description: regex }, { category: regex }]
        })
        return res.json(productItems)
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
})

router.get("/product", async (req, res) => {
    try {
        const productItems = await ProductItems.findOne({ _id: req.query.id }).populate({
            path: "reviews",
            populate: {
                path: "author",
                model: "User",
                select: "name -_id"
            }
        });


        return res.json(productItems)
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
})


router.post("/createProduct", isLoggedIn, upload.array("images"), isOwner,
    [
        body("price").isString().notEmpty(),
        body("name").isString().notEmpty(),
        body("category").isString().notEmpty(),
        body("color").isString().notEmpty(),
        body("material").isString().notEmpty(),
        body("brand").isString().notEmpty(),
        body("description").isString().notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() })
        }
        try {
            const ProductCat = await ProductCategories.find({ category: req.body.category })
            if (ProductCat.length == 0) {
                return res.status(400).json({ success: false, error: "invalid category" })
            }
            const items = new ProductItems(req.body)
            console.log(items)
            items.owner = req.user._id
            items.images = req.files.map(f => ({ url: f.path, filename: f.filename }))

            await items.save()
            res.json({ success: true })
        } catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    })

// , isLoggedIn, isOwner
router.post("/editProduct", isLoggedIn, upload.array("images"), isOwner,
    [
        body("price").isString().notEmpty(),
        body("name").isString().notEmpty(),
        body("category").isString().notEmpty(),
        body("color").isString().notEmpty(),
        body("material").isString().notEmpty(),
        body("brand").isString().notEmpty(),
        body("description").isString().notEmpty(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, error: errors.array() })
            }
            const data = await ProductItems.findByIdAndUpdate(req.body._id, req.body)
            const images = req.files.map(f => ({ url: f.path, filename: f.filename }))
            if (req.body.sizes && data.sizes.length == 0) {
                data.sizes = req.body.sizes
            }
            data.images.push(...images)
            await data.save()
            if (req.body.deleteImages) {
                await data.updateOne({ $pull: { images: { _id: { $in: req.body.deleteImages } } } })
                for (let image of data.images) {
                    if (req.body.deleteImages.includes(image._id)) {
                        await cloudinary.uploader.destroy(image.filename)
                    }
                }
            }
            res.json({ success: true })
        } catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    })

router.post("/deleteProduct", isLoggedIn, isOwner, async (req, res) => {
    try {
        const id = req.body.id
        const resp = await ProductItems.findByIdAndDelete(id)
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }

})


module.exports = router