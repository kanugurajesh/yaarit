import express from "express";
import authM from "../middleware/authM.js";
import { profileInfo } from "../controllers/profileController.js";
// const gmailRouter = express.Router();
const profileRouter = express.Router();

profileRouter.post("/profileInfo", authM, profileInfo);

export default profileRouter;
