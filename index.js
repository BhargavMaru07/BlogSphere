const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/blogsphere")
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("Error in MongoDb",e))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, ()=>{
    `App is listening on PORT : ${PORT}`;
});
