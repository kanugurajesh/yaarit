import express from "express";
import authM from "../middleware/authM.js";
import { sendMail, verifyMail } from "../controllers/gmailController.js";

const gmailRouter = express.Router();

gmailRouter.post("/sendMail", authM, sendMail);
gmailRouter.post("/verifyMail", authM, verifyMail);

export default gmailRouter;
