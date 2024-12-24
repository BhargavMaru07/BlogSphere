const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const Blog = require("./model/blog")

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/blogsphere")
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("Error in MongoDb",e))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
  let allBlogs = await Blog.find({})
  res.render("home",{
    user:req.user,
    blogs:allBlogs
  });
});

app.listen(PORT, ()=>{
    `App is listening on PORT : ${PORT}`;
});
