const express = require("express");
const router = require("./routes");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {authMiddleware} = require("./middlewares/authMiddleware")

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authMiddleware);

app.engine("hbs", handlebars.engine({
    extname: "hbs"
    }));
    
app.set("view engine", "hbs");
    
app.use(router);
mongoose.connect("mongodb://localhost:27017/course-book");
mongoose.connection.on("connected", () => console.log("DB is connected"));
mongoose.connection.on("disconnected", () => console.log("DB is disconnected"));
mongoose.connection.on("error", (err) => console.log(err));



// app.listen(5000, () => console.log("Server is lisntening on http://27.0.0.1.:5000"))
app.listen(5000, () => console.log("Server is lisntening on http://localhost:5000"))