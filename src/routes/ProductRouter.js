const express = require("express")
const router = express.Router()
const ProductCotroller = require("../controllers/ProductCotroller")
const {authMiddleWare} = require("../middleware/authMiddleware")

router.post("/create", ProductCotroller.createProduct)
router.put("/update/:id", authMiddleWare,ProductCotroller.updateProduct)
router.get("/details/:id",ProductCotroller.getDetailsProduct)
router.delete("/delete/:id",ProductCotroller.deleteProduct)
router.get("/get-all",ProductCotroller.getAllProduct)




module.exports = router