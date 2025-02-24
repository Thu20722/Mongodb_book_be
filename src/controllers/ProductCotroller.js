const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
    try {

        const { name, image, type, price, countInStock, rating,description } = req.body;
        console.log("req.body",req.body)

        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is required"
            })
        }
        
        console.log("response", req.body)
        const response = await ProductService.createProduct(req.body);

        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if(!productId){
            return res.status(200).json({
                status: "ERR",
                message:"The product is required"
            })
        }
        console.log("productId", productId)

        const result = await ProductService.updateProduct(productId,data);

        
        return res.status(200).json(result
        );

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error.'
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
       
        if(!productId){
            return res.status(200).json({
                status: "ERR",
                message:"The userId is required"
            })
        }
        const response = await ProductService.getDetailsProduct(productId);

        // Gửi phản hồi khi người dùng được tạo thành công
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
       
        if(!productId){
            return res.status(200).json({
                status: "ERR",
                message:"The userId is required"
            })
        }
        const response = await ProductService.deleteProduct(productId);

        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            status: 'ERR',
            message: e.message || 'Internal server error.'
        });
    }
};
const getAllProduct = async(req,res) => {
    try {
        const {limit, page,sort,filter} = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page)|| 0, sort,filter)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = { 
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct 

};
