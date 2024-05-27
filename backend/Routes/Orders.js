const express = require("express")
const router = express.Router()
const ProductOrders = require("../models/ProductOrders")
const { body, validationResult } = require("express-validator")
const { isLoggedIn } = require("../middlewares")

router.post("/order", isLoggedIn, [
    body("email").isEmail().notEmpty(),
    body("totalPrice").notEmpty(),
    body("orderData").isArray().notEmpty()],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() })
        }
        try {
            const data = req.body
            if (data.orderData.length == 0) {
                return res.status(400).json({ success: false, error: "empty orders data" })

            }
            await ProductOrders.create(data)
            return res.json({ success: true })
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    })

router.post("/ordersData", isLoggedIn, async (req, res) => {
    try {
        const email = req.body.email
        if (!email) {
            return res.status(400).json({ success: false, error: "email missing" })
        }
        const data = await ProductOrders.find({ email: email }).sort({ timeStamp: -1 })
        return res.json({ success: true, data: data })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
})
module.exports = router