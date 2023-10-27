import UserSchema from "../models/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const signin = async (req, res) => {
  const { email, password } = req.body;
  let response = {
    email: "",
    password: "",
    token: "",
    message: "",
  };
  try {
    const existingUser = await UserSchema.findOne({ _id: email });
    if (!existingUser) {
      response.message = "User doesn't exist";
      return res.send(response);
    }
    if (existingUser.Password !== password) {
      response.message = "Invalid credentials";
      return res.send(response);
    }
    const payload = {
      email: email,
      password: password,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    response.token = token;
    response.email = email;
    response.password = password;
    return res.send(response);
  } catch (error) {
    response.message = "Something went wrong";
    return res.send(response);
  }
};

const autosignin = async (req, res) => {
  let response = {
    email: "",
    password: "",
    message: "",
  };

  try {
    const { token } = req.body;
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
    const email = decodedToken.email;
    const password = decodedToken.password;
    const existingUser = await UserSchema.findOne({ _id: email });
    if (!existingUser) {
      response.message = "Something went wrong";
      return res.send(response);
    }
    const Match = existingUser.Password === password;
    if (Match) {
      response.email = email;
      response.password = password;
      return res.send(response);
    }
    response.message = "Something went wrong";
    return res.send(response);
  } catch (error) {
    response.message = "No token";
    return res.send(response);
  }
};

export { signin, autosignin };
