require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connectDB = require("./database/connection");

//data base connection
connectDB();

//api
const API = require("./constant/api/Api");

//routes
const gradeRoute = require("./router/grade.router");
const userRoute = require("./router/user.router");
const storyRoute = require("./router/story.router");

//uses
app.use(fileUpload());
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//use api
app.use(API.gradeAPI, gradeRoute);
app.use(API.userApi, userRoute);
app.use(API.storyApi, storyRoute);

app.listen(process.env.PORT, () => {
  console.log(process.env.LOCAL_HOST_PORT);
});
