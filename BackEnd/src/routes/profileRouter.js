import express from "express";
import authM from "../middleware/authM.js";
import { profileInfo } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.post("/", authM, profileInfo);
profileRouter.post("/profileInfo", authM, profileInfo);

export default profileRouter;
