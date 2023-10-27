import express from "express";
import {
  sendForgetMail,
  verifyForgetMail,
  ChangePassword,
} from "../controllers/forgetGmailController.js";
import authM from "../middleware/authM.js";

const userRouter = express.Router();

userRouter.post("/sendForgetMail", authM, sendForgetMail);
userRouter.post("/verifyForgetMail", authM, verifyForgetMail);
userRouter.post("/ChangePassword", authM, ChangePassword);

export default userRouter;
