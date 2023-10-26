import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PhoneNo: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  Plan: {
    type: String,
    required: true,
  },
  Events: [
    {
      type: Number,
    },
  ],
});

export default mongoose.model("User", UserSchema);
