import express from "express";
import authM from "../middleware/authM.js";
import { signin, autosignin } from "../controllers/authController.js";

const userRouter = express.Router();

userRouter.post("/signin", authM, signin);
userRouter.post("/autosignin", authM, autosignin);

export default userRouter;
