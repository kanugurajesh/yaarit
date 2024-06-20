import express from "express";
import authM from "../middleware/authM.js";
import {
  bloglist,
  blogpage,
  blogupload,
} from "../controllers/blogController.js";

const blogsRouter = express.Router();

blogsRouter.post("/blogsList", authM, bloglist);
blogsRouter.post("/blogsPage", authM, blogpage);
blogsRouter.post("/blogsUpload", blogupload);

export default blogsRouter;
