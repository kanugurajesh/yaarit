import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  Photo: {
    data: String,
    contentType: String,
  },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Year: { type: String, required: true },
  Dept: { type: String, required: true },
  Image: {
    data: String,
    contentType: String,
  },
  Domain: { type: String, required: true },
  Heading: { type: String, required: true },
  Summary: { type: String, required: true },
  Date: {
    type: String,
    required: true,
  },
  Text: [{ type: String, required: true }],
});

export default mongoose.model("Blogs", BlogSchema);
