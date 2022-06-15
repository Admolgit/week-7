import { Request, Response } from 'express';
// import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Transaction from '../models/transaction';
import createAccount from '../models/createAccount';

uuidv4()

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 5 } = req.query as any;
    const transactionReciept = await Transaction.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)

    res.status(200).json({ total: transactionReciept.length, transactionReciept});
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { senderAccount, recieverAccount, amount, transferDescription } = req.body;

  try {

  let senderAccDetails: any = await createAccount.findOne( { account: senderAccount } );
  let recieverAccDetails: any = await createAccount.findOne( { account: recieverAccount } );


  if(senderAccDetails.balance < amount) {
    throw new Error('Insufficient Balance')
  }

  let newSenderAccBalance: any = senderAccDetails.balance - amount;
  let newRecieverAccBalance: any = recieverAccDetails.balance + amount;

  await createAccount.findOneAndUpdate({ account: senderAccount }, {balance: newSenderAccBalance} );
  await createAccount.findOneAndUpdate({ account: recieverAccount }, { balance: newRecieverAccBalance } );

  let transferReciept = new Transaction({
    reference: uuidv4(),
    senderAccount,
    recieverAccount,
    amount,
    transferDescription,
    createdAt: new Date().toISOString()
  });

    await transferReciept.save();

    res.status(201).json(transferReciept);

  } catch (error: any) {
    console.log(error.message);
  }

};

export default {
  getTransaction,
  createTransaction,
};
