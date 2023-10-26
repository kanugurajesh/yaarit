import EventSchema from "../models/event.js";
import UserSchema from "../models/auth.js";
import * as fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const GMAIL_ID = process.env.GMAIL_ID;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_ID,
    pass: GMAIL_PASSWORD,
  },
});

const eventlist = async (req, res) => {
  let response = { message: "", data: {} };
  try {
    const eventlist = await EventSchema.find().sort({ $natural: -1 }).limit(4);
    response.data = eventlist;
    res.send(response);
  } catch (error) {
    response.message = "Failed to load";
    res.send(response);
  }
};

const eventpage = async (req, res) => {
  let response = { message: "", data: {} };
  try {
    const eventlist = await EventSchema.find().sort({ $natural: -1 });
    response.data = eventlist;
    res.send(response);
  } catch (error) {
    response.message = "Failed to load";
    res.send(response);
  }
};

const eventregistration = async (req, res) => {
  const { token, id } = req.body;
  try {
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
    const email = decodedToken.email;
    const data = await EventSchema.find({ _id: id });
    const mailOptions = {
      from: GMAIL_ID,
      to: email,
      subject: ` Registration Google form - ` + data[0].Heading,
      html: `<div>
                <a href=${data[0].GForm}>Google form</a>
                  </div>
                `,
    };
    UserSchema.updateOne({ _id: email }, { $addToSet: { Events: id } })
      .then(() => {
        transporter
          .sendMail(mailOptions)
          .then(() => {
            return res.send("Mail sent");
          })
          .catch(() => {
            return res.send("Mail not sent");
          });
      })
      .catch(() => {
        return res.send("Registration Error!");
      });
  } catch (error) {
    return res.send("Internal server error");
  }
};

const eventupload = async (req, res) => {
  const event = new EventSchema({
    _id: 3,
    GForm:
      "https://docs.google.com/forms/d/e/1FAIpQLScokq_qqcKBpftStHCxFHP6ncFp17gvH9uBvbvF_1iR1xVNaQ/viewform?usp=sf_link",
    Summary: "Short Summary",
    Gdrive:
      "https://drive.google.com/drive/folders/1mBKMyj_rjgJWJXRrneVyrEmNMoePgak_?usp=sharing",
    Image: {
      data: fs.readFileSync("E:/YaarIt/FrontEnd/src/assets/Blog.png", {
        encoding: "base64",
      }),
      contentType: "image/png",
    },
    Heading: "Google Cloud Study Jams - 1",
    Date: "Oct 7, 2023",
    Expiry: new Date(),
  });
  res.send(await event.save());
};

const eventfetch = async (req, res) => {
  let response = {
    message: "",
    data: {},
  };
  try {
    const token = req.body.token;
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
    const email = decodedToken.email;
    const data = await UserSchema.find({ _id: email }, { Events: 1, _id: 0 });
    response.data = data;
    res.send(response);
  } catch (error) {
    response.message = "Internal Server Error";
    res.send(response);
  }
};

export { eventlist, eventpage, eventregistration, eventupload, eventfetch };
