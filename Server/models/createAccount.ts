import mongoose from "mongoose";

interface create {
  account: Number,
  balance: Number,
  createdAt: String
}

const accountSchema: create | any = new mongoose.Schema({
  account: {
    type: Number,
    require: true
  },
  balance: {
    type: Number,
    require: true
  },
  createdAt: {
    type: String,
    require: true
  }
});

const createAccount = mongoose.model("createaccount", accountSchema);

export default createAccount;
