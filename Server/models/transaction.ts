import mongoose from "mongoose";

interface Transaction {
  reference: String,
  senderAccount: Number,
  amount: Number,
  receiverAccount: Number,
  transferDescription: String,
  createdAt: String
}

const transactionSchema: Transaction | any = new mongoose.Schema({
  reference: {
    type: String,
    require: true
  },
  senderAccount: {
    type: Number,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
  receiverAccount: {
    type: Number,
    require: true
  },
  transferDescription: {
    type: String,
    require: true
  },
  createdAt: {
    type: String,
    require: true
  },
})

const Transaction = mongoose.model('transaction', transactionSchema)

export default Transaction;
