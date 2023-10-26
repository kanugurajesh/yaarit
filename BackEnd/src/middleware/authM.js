import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

const authM = (req, res, next) => {
  try {
    const { AUTH_API_KEY } = req.body;

    if (!AUTH_API_KEY) {
      return res.send("API_KEY is missing");
    }

    if (AUTH_API_KEY !== API_KEY) {
      return res.send("API_KEY is incorrect");
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authM;
