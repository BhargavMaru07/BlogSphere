const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../model/blog");
const Comment = require("../model/comment");

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
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id",async (req,res)=>{
  let blog = await Blog.findById(req.params.id).populate("createdBy")
  let comments = await Comment.find({blogId:req.params.id}).populate("createdBy")
   return res.render("blogPage",{
    user:req.user,
    blog,
    comments
   })
})  

router.post("/comment/:blogId",async (req,res)=>{
  await Comment.create({
    content:req.body.content,
    blogId:req.params.blogId,
    createdBy:req.user._id
  });
  return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router;