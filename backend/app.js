if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const mongoose = require("mongoose")
const UserRoutes = require("./Routes/User")
const ProductItemRoutes = require("./Routes/ProductItems")
const ProductOrderRoutes = require("./Routes/Orders")
const ProductCategoryRoutes = require("./Routes/ProductCategories")
const CommentRoutes = require("./Routes/Ratings")
const morgan = require("morgan")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const cookies = require("cookie-parser")
const cors = require("cors");
const passport = require("passport")
const LocalStratergy = require("passport-local")
const User = require("./models/User")


const app = express()
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next()
})

// const dbUrl = "mongodb://localhost:27017/product-app"
const dbUrl = process.env.DB_URL
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.SESSION_SECRET
    }
});

const sessionConfig = {
    store,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}


app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(express.json())
app.use(morgan("tiny"))
app.use(cookies())

mongoose.connect(dbUrl).then(() => {
    console.log("connected")
}).catch((e) => {
    console.log("error", e)
})

app.use("/api", UserRoutes)
app.use("/api/comments", CommentRoutes)
app.use("/api/productItems", ProductItemRoutes)
app.use("/api/productOrders", ProductOrderRoutes)
app.use("/api/productCategories", ProductCategoryRoutes)

app.use((error, req, res, next) => {
    const { statusCode = 400 } = error;
    if (!error.message) error.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).json({ error })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})