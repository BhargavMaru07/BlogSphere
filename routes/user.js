const { Router } = require("express");
const User = require("../model/user");

const router = Router();

router
  .route("/signup")
  .get((req, res) => {
    return res.render("signup");
  })
  .post(async (req, res) => {
    let { fullName, email, password } = req.body;

    await User.create({
      fullName,
      email,
      password,
    });

    return res.redirect("/");
  });

router
  .route("/signin")
  .get((req, res) => {
    return res.render("signin");
  })
  .post(async (req, res) => {
    let { email, password } = req.body;

    try {
      let token = await User.matchPasswordAndGenerateToken(email, password);
      console.log(token);
      if (!token) return res.redirect("/signin");
      return res.cookie("token", token).redirect("/");
    } catch (error) {
      res.render("signin", {
        error: "Incorrect Password or Email",
      });
    }
  });

  router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
  })

module.exports = router;
