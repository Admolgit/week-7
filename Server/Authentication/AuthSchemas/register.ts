import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true,
    minLength: 8,
    maxLength: 60
  },
  createdAt: {
    type: String
  }
});

registerSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));

  return token;
}

const userAccount = mongoose.model("useraccount", registerSchema);

export default userAccount;
