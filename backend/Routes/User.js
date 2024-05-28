const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require("express-validator")
const { isLoggedIn, modifyUsername } = require("../middlewares")
const passport = require("passport")



router.post("/userData", isLoggedIn, (req, res) => {
    const email = req.user.email;
    const username = req.user.username;
    const type = req.user.type;
    const userId = req.user._id
    return res.json({ success: true, email, type, username, userId })
})

router.post("/createUser", [
    body("email").isEmail().notEmpty(),
    body("name").notEmpty().isLength({ min: 5 }),
    body("password").notEmpty().isLength({ min: 5 }),],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).json({ success: false, error: errors.array() })
            return res.redirect(`${process.env.FE_URL}/signup`);

        }
        try {
            const body = req.body
            const user = new User({ name: body.name, location: body.location, username: body.username, email: body.email })
            const newUser = await User.register(user, body.password)

            req.login(newUser, (err) => {
                if (err)
                    return next(err);
                return res.redirect(`${process.env.FE_URL}`);
                // return res.json({ success: true, email: user.email, username: user.username, type: "user" })
            })


        } catch (error) {
            console.log(error)
            return res.redirect(`${process.env.FE_URL}/signup`);
            // return res.status(500).json({ success: false, error: error })
        }
    })


router.post('/loginUser', modifyUsername, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            res.status(400)
            return res.redirect(`${process.env.FE_URL}/login`);
            // return res.status(400).json({ success: false, message: "incorrect credentials" })
        }
        req.login(user, err => {
            if (err) {
                // next(err);
                return res.redirect(`${process.env.FE_URL}/login`);

            }
            // return res.status(200).json({ success: true, email: user.email, username: user.username, type: user.type })
            return res.redirect(`${process.env.FE_URL}`);
        });
    })(req, res, next);
})


router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err)
        res.json({ success: true })
    });
})

module.exports = router;
