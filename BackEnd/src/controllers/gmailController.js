import UserSchema from "../models/auth.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import path from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const GMAIL_ID = process.env.GMAIL_ID;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const FILE_PATH = path.join(__dirname, "../data.json");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_ID,
    pass: GMAIL_PASSWORD,
  },
});

async function sendMail(req, res) {
  const { username, email, phno, password, year, branch, plan } = req.body; // Input from frontend
  const existingUser = await UserSchema.findOne({ _id: email });
  if (existingUser) {
    return res.send("User already exists"); // Handle This In frontend
  }
  const PASSWORD_DURATION = Date.now() + 5 * 60 * 1000;
  const AUTH_PASSWORD = uuidv4().toString();
  const mailOptions = {
    from: GMAIL_ID,
    to: email,
    subject: "🎉 Welcome to yaarit",
    html: `<html><body>${AUTH_PASSWORD}</body></html>`,
  };
  const NEW_USER_OBJECT = {
    [AUTH_PASSWORD]: {
      username: username,
      email: email,
      phno: phno,
      password: password,
      year: year,
      branch: branch,
      plan: plan,
      PASSWORD_DURATION: PASSWORD_DURATION,
    },
  };
  transporter
    .sendMail(mailOptions)
    .then(async () => {
      try {
        const readFilePromise = promisify(fs.readFile);
        const writeFilePromise = promisify(fs.writeFile);
        const data = await readFilePromise(FILE_PATH, "utf-8");
        const users = JSON.parse(data);
        const newData = {
          ...users,
          ...NEW_USER_OBJECT,
        };
        await writeFilePromise(FILE_PATH, JSON.stringify(newData, null, 2));
        return res.send("Mail sent"); // Handle This In frontend
      } catch (error) {
        return res.send("Error occured");
      }
    })
    .catch((error) => {
      console.log(error);
      return res.send("Mail not sent");
    });
}

async function verifyMail(req, res) {
  try {
    const { AUTH_PASSWORD } = req.body; // Input from frontend
    const readFilePromise = promisify(fs.readFile);
    const writeFilePromise = promisify(fs.writeFile);
    const data = await readFilePromise(FILE_PATH, "utf-8");
    const users = JSON.parse(data);
    if (!users[AUTH_PASSWORD]) {
      return res.send("Invalid verification code"); // Handle This In frontend
    }
    const {
      username,
      email,
      phno,
      password,
      year,
      branch,
      plan,
      PASSWORD_DURATION,
    } = users[AUTH_PASSWORD];
    if (Date.now() > PASSWORD_DURATION) {
      delete users[AUTH_PASSWORD];
      await writeFilePromise(FILE_PATH, JSON.stringify(users, null, 2));
      return res.send("Verification code expired"); // Handle This In frontend
    }
    const newUser = new UserSchema({
      _id: email,
      Username: username,
      Email: email,
      PhoneNo: phno,
      Password: password,
      Year: year,
      Branch: branch,
      Plan: plan,
    });
    const mailOptions = {
      from: GMAIL_ID,
      to: email,
      subject: ` 🎉 Congratulations you are now a part of website `,
      html: `
            <div style="border:2px solid black; padding:10px; width:50%; margin:auto;">
              <div style="width:100%;margin:auto;">
                <h1>👋 ${username},</h1>
                  <p>😀 Your registration is successful.</p>
                  <p>Regards,</p>
                  <p>Rajesh</p>
              </div>
            </div>
          `,
    };
    newUser
      .save()
      .then((result) => {
        transporter
          .sendMail(mailOptions)
          .then(async () => {
            delete users[AUTH_PASSWORD];
            await writeFilePromise(FILE_PATH, JSON.stringify(users, null, 2));
            return res.send("User registered successfully"); // Handle This In frontend
          })
          .catch(async () => {
            delete users[AUTH_PASSWORD];
            await writeFilePromise(FILE_PATH, JSON.stringify(users, null, 2));
            return res.send("Mail not sent registered"); // Handle This In frontend
          });
      })
      .catch(async (error) => {
        delete users[AUTH_PASSWORD];
        await writeFilePromise(FILE_PATH, JSON.stringify(users, null, 2));
        return res.send("Error in saving the user"); // Handle This In frontend
      });
  } catch (error) {
    delete users[AUTH_PASSWORD];
    await writeFilePromise(FILE_PATH, JSON.stringify(users, null, 2));
    return res.send("Internal Server Error");
  }
}

export { sendMail, verifyMail };
