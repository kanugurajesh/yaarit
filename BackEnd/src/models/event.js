import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  GForm: { type: String, required: true },
  Summary: { type: String, required: true },
  Gdrive: { type: String, required: true },
  Image: {
    data: String,
    contentType: String,
  },
  Heading: { type: String, required: true },
  Date: { type: String, required: true },
  Expiry: { type: Date, required: true },
});

export default mongoose.model("Events", EventSchema);
