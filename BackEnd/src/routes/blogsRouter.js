import express from "express";
import authM from "../middleware/authM.js";
import {
  bloglist,
  blogpage,
  blogupload,
} from "../controllers/blogController.js";

<<<<<<< HEAD
// Router
=======
>>>>>>> 8ca597076e89c4bf61b692bbf3fb6f0566d73299
const blogsRouter = express.Router();

blogsRouter.post("/blogsList", authM, bloglist);
blogsRouter.post("/blogsPage", authM, blogpage);
blogsRouter.post("/blogsUpload", blogupload);

export default blogsRouter;
