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
const FILE_PATH = path.join(__dirname, "../forgetemail.json");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_ID,
    pass: GMAIL_PASSWORD,
  },
});

const sendForgetMail = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await UserSchema.findOne({ _id: email });
    if (!existingUser) {
      return res.send("User does not exist");
    }
    const PASSWORD_DURATION = Date.now() + 5 * 60 * 1000;
    const AUTH_PASSWORD = uuidv4().toString();
    const mailOptions = {
      from: GMAIL_ID,
      to: email,
      subject: "Welcome to the world of Programming",
      html: `
            <html>
            <body>
              <span>${AUTH_PASSWORD}</span>
            </body>
            </html>
            
        `,
    };
    const NEW_USER_OBJECT = {
      [AUTH_PASSWORD]: {
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
          console.log(error);
          return res.send("Internal Server Error");
        }
      })
      .catch(() => {
        return res.send("Mail not sent");
      });
  } catch (error) {
    return res.send("Internal Server Error");
  }
};

const verifyForgetMail = async (req, res) => {
  try {
    const { AUTH_PASSWORD } = req.body;
    const readFilePromise = promisify(fs.readFile);
    const writeFilePromise = promisify(fs.writeFile);
    const data = await readFilePromise(FILE_PATH, "utf-8");
    const users = JSON.parse(data);
    if (!users[AUTH_PASSWORD]) {
      delete users[AUTH_PASSWORD];
      await writeFilePromise(FILE_PATH, JSON.stringify(users, null, 2));
      return res.send("Invalid verification code");
    }
    const { PASSWORD_DURATION } = users[AUTH_PASSWORD];
    if (Date.now() > PASSWORD_DURATION) {
      delete users[AUTH_PASSWORD];
      await writeFilePromise(FILE_PATH, JSON.stringify(users, null, 2));
      return res.send("Verification code expired");
    }
    delete users[AUTH_PASSWORD];
    await writeFilePromise(FILE_PATH, JSON.stringify(users, null, 2));
    return res.send("Correct code");
  } catch (error) {
    delete users[AUTH_PASSWORD];
    await writeFilePromise(FILE_PATH, JSON.stringify(users, null, 2));
    return res.send("Internal Server Error");
  }
};

const ChangePassword = async (req, res) => {
  const { email, password } = req.body;
  UserSchema.findOneAndUpdate({ _id: email }, { Password: password })
    .then(() => {
      const mailOptions = {
        from: GMAIL_ID,
        to: email,
        subject: "Password Updated",
        html: `
                        <div style="border:2px solid black; padding:10px; width:50%; margin:auto;">
                            <h1>Hi ${email},</h1>
                            <p>"Password Updated"</p>
                            <p>Regards,</p>
                            <p>Rajesh</p>
                        </div>
                    `,
      };
      transporter
        .sendMail(mailOptions)
        .then(() => {
          return res.send("Password updated successfully");
        })
        .catch(() => {
          return res.send("Password Updated But mail not sent");
        });
    })
    .catch((error) => {
      console.log(error);
      return res.send("Internal Server Error");
    });
};

export { sendForgetMail, verifyForgetMail, ChangePassword };
