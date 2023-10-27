import express from "express";
import authM from "../middleware/authM.js";
import { profileInfo } from "../controllers/profileController.js";
<<<<<<< HEAD

// const gmailRouter = express.Router();
const profileRouter = express.Router();

profileRouter.post("/", authM, profileInfo);
=======
// const gmailRouter = express.Router();
const profileRouter = express.Router();

profileRouter.post("/profileInfo", authM, profileInfo);
>>>>>>> 8ca597076e89c4bf61b692bbf3fb6f0566d73299

export default profileRouter;
