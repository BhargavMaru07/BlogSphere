const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../model/blog");

const router = Router();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve("./public/uploads"))
    },
    filename:function(req,file,cb){
        const filename = `${Date.now()}-${file.originalname}`
        cb(null,filename)
    }
})

const upload = multer({storage})

router.get("/add-new", (req, res) => {
 return res.render("blog",{
    user:req.user
 });
});

router.post("/add-new", upload.single("coverImage"), async (req, res) => {
  let { title, body } = req.body;

  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImage: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/add-new/${blog._id}`);
});


module.exports = router;