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

    let user = await User.matchPassword(email, password);
    console.log(user);
    if (!user) return res.redirect("/signin");

    return res.redirect("/");
  });

module.exports = router;
