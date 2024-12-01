const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService")

const createUser = async (req, res) => {
    try {
        console.log(req.body);

        const { name, email, password, confirmPassword, phone } = req.body;

        const errors = [];

        // Kiểm tra email hợp lệ
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password || !confirmPassword) {
            errors.push('All fields are required.');
        }
        if (!isCheckEmail) {
            errors.push('Invalid email format.');
        }
        if (String(password) !== String(confirmPassword)) {
            errors.push('Password and confirm password must be the same.');
        }

        // Nếu có lỗi thì trả về
        if (errors.length > 0) {
            return res.status(400).json({
                status: 'ERR',
                message: errors.join(', ')  // Gửi tất cả lỗi dưới dạng chuỗi
            });
        }

        // Gọi hàm tạo người dùng từ UserService
        const result = await UserService.createUser({ name, email, password, confirmPassword, phone });

        // Gửi phản hồi khi người dùng được tạo thành công
        return res.status(200).json(result
        );

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error.'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log(req.body);

        const {email, password} = req.body;

        const errors = [];

        // Kiểm tra email hợp lệ
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password) {
            errors.push('All fields are required.');
        }
        if (!isCheckEmail) {
            errors.push('Invalid email format.');
        }

        // Nếu có lỗi thì trả về
        if (errors.length > 0) {
            return res.status(400).json({
                status: 'ERR',
                message: errors.join(', ')  // Gửi tất cả lỗi dưới dạng chuỗi
            });
        }

        // Gọi hàm tạo người dùng từ UserService
        const result = await UserService.loginUser(req.body);

        const { refresh_token,...newResponse} = result
        // res.cookie("refresh_token", refresh_token, {
        //     httpOnly: true,
        //     secure: false,
        //     samesties: "strict"
        // })
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true, 
            secure: false,    
            sameSite: 'Strict', 
            maxAge: 24 * 60 * 60 * 1000 
          });
        // Gửi phản hồi khi người dùng được tạo thành công
        return res.status(200).json(newResponse);

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error.'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message:"The userId is required"
            })
        }
        console.log("userId", userId)
        // Gọi hàm tạo người dùng từ UserService
        const result = await UserService.updateUser(userId,data);

        // Gửi phản hồi khi người dùng được tạo thành công
        return res.status(200).json(result
        );

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error.'
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
       
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message:"The userId is required"
            })
        }
        // console.log("userId", userId)
        // Gọi hàm tạo người dùng từ UserService
        const result = await UserService.deleteUser(userId);

        // Gửi phản hồi khi người dùng được tạo thành công
        return res.status(200).json(result
        );

    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Internal server error.'
        });
    }
};
const getAllUser = async(req,res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
       
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message:"The userId is required"
            })
        }
        const response = await UserService.getDetailsUser(userId);

        // Gửi phản hồi khi người dùng được tạo thành công
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};
const refreshToken= async (req, res) => {
    try {
        const token = req.cookies.refresh_token
       
        if(!token){
            return res.status(200).json({
                status: "ERR",
                message:"The token is required"
            })
        }
        const response = await JwtService.refreshTokenJwtService(token);

        // Gửi phản hồi khi người dùng được tạo thành công
        return res.status(200).json(response);

    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};
module.exports = { 
    createUser, 
    loginUser, 
    updateUser, 
    deleteUser, 
    getAllUser, 
    getDetailsUser, 
    refreshToken};
