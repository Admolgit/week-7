import { Request, Response } from "express";
import getRandom from "../../utilities/accountgenerator";
import createAccount from "../models/createAccount";

interface create {
  account: Number,
  balance: Number,
  createdAt: String
}

export const getAllAccount = async (req: Request, res: Response) => {

  try {

    const { page = 1, limit = 5 } = req.query as any;
    const allAccount = await createAccount.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);

    res.status(200).json({ total: allAccount.length, allAccount });

  } catch (error: String | String[] | any) {

    console.log(error.message)

  }
}

export const createBankAccount = async (req: Request, res: Response) => {

  let body = req.body;

  let uniqueAcc = await getRandom(10);

  let uniqueUser: create | any = new createAccount({ account: uniqueAcc, ...body, createdAt: new Date().toISOString() })

  try {
    await uniqueUser.save()

    res.status(201).json(uniqueUser);

  } catch (error: any) {
    console.log(error.message)
  }
}

export default {
  createBankAccount,
  getAllAccount
}
