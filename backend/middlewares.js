const User = require("./models/User");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next("You must be signed in first")
    }
    next();
}


module.exports.isOwner = (req, res, next) => {
    // if (req.user.type === "admin") {
    //     return next()
    // }
    if (req.user._id != req.body.owner) {
        next("you are not authorized for it")
    }
    next()
}

module.exports.modifyUsername = async (req, res, next) => {
    const username = req.body.username
    // if (!username)
    //     return next("incorrect credentials")
    const userData = await User.findOne({ $or: [{ username: username }, { email: username }] })
    if (!userData)
        req.body.username = ""
    else
        req.body.username = userData.username
    next()
}