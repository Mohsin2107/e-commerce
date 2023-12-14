import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["buyer", "seller"],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 2,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
