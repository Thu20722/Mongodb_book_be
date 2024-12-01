const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const authMiddleWare = (req, res, next) => {
    // console.log("checkToken", req.headers.token)
    const token = req.headers.token.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user){
        if (err) {
            return res.status(404).json({
                status: "ERROR",
                message: "The authentication",
            });
    }

    // Kiểm tra quyền admin
        const {payload} = user
        if (payload?.isAdmin) {
            next(); // Chuyển quyền điều khiển sang middleware tiếp theo
        } else {
            return res.status(404).json({
                status: "ERROR",
                message: "The authentication",
            });
        }
});


}
const authUserMiddleWare = (req, res, next) => {
    console.log("req.headers", req.headers)
    const token = req.headers.token.split(" ")[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user){
        if (err) {
            return res.status(404).json({
                status: "ERROR",
                message: "The authentication",
            });
    }
    console.log("user")

    // Kiểm tra quyền admin
        if (user?.isAdmin || user?.id === userId) {
            next(); // Chuyển quyền điều khiển sang middleware tiếp theo
        } else {
            return res.status(404).json({
                status: "ERROR",
                message: "The authentication",
            });
        }
});


}
module.exports = {
    authMiddleWare,
    authUserMiddleWare
}