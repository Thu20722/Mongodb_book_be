const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");  // Khai báo cors chỉ một lần
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Cấu hình CORS trước khi sử dụng các route khác
app.use(cors({
  origin: 'http://localhost:5173', // Địa chỉ frontend
  credentials: true,  // Cho phép gửi cookies
}));

app.use(bodyParser.json());
app.use(cookieParser());

routes(app);


mongoose.connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect DB success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
