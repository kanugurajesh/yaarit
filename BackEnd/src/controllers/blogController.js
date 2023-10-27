import BlogSchema from "../models/blog.js";
import * as fs from "fs";

const bloglist = async (req, res) => {
  let response = { message: "", data: {} };
  try {
    const bloglist = await BlogSchema.find().sort({ $natural: -1 }).limit(4);
    response.data = bloglist;
    res.send(response);
  } catch (error) {
    response.message = "Failed to load";
    res.send(response);
  }
};

const blogpage = async (req, res) => {
  let response = { message: "", data: {} };
  try {
    const bloglist = await BlogSchema.find().sort({ $natural: -1 });
    response.data = bloglist;
    res.send(response);
  } catch (error) {
    response.message = "Failed to load";
    res.send(response);
  }
};

const blogupload = async (req, res) => {
  //for admin use only
  const blog = new BlogSchema({
    _id: 5,
    Photo: {
      data: fs.readFileSync("E:/YaarIt/FrontEnd/src/assets/Blog.png", {
        encoding: "base64",
      }),
      contentType: "image/png",
    },
    FirstName: "Tarun",
    LastName: "Jakkula",
    Year: "Fourth Year",
    Dept: "CSE",
    Image: {
      data: fs.readFileSync("E:/YaarIt/FrontEnd/src/assets/Ellipse.png", {
        encoding: "base64",
      }),
      contentType: "image/png",
    },
    Domain: "Digital Marketing ",
    Heading: "Best Digital Marketing Strategies You should be Using Right Now",
    Summary:
      "It has survived only five centuries, but also the leap into electronic typesetting, remaining",
    Date: "15-11-2022",
    Text: [
      "It all started a couple of weeks ago when I was going through my feed on X. It feels weird to call “Twitter” by a different name now. It’s like that kid in high school whom you’ve known by one name for a long time suddenly changes their name, just feels odd.",
      "I thought long and hard about it and proceeded to read the rest ofthe thread. Artiom made some very logical points highlighting the need for designers to grow by focusing on things that bring business value beyond pixels. He also had some pointers on how to do this:",
    ],
  });
  res.send(await blog.save());
};

export { bloglist, blogpage, blogupload };
