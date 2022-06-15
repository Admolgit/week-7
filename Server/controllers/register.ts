import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import registerSchema from "../Authentication/AuthSchemas/register";

interface create {
  account: Number,
  balance: Number,
  createdAt: String
}

export const getAllAccountRegistered = async (req: Request, res: Response) => {

  try {

    const { page = 1, limit = 5 } = req.query as any;
    const allRegisteredAccount = await registerSchema.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);

    res.status(200).json({ total: allRegisteredAccount.length, allRegisteredAccount });

  } catch (error: String | String[] | any) {

    console.log(error.message)

  }
}

export const getUser = async (req: Request | any, res: Response, next: NextFunction) => {
  const user = await registerSchema.findById(req.email).select('-password');

  // console.log(user)

  res.status(200).json(user);

  next();

};

export const createRegisteredAccount = async (req: Request, res: Response) => {

  let body = req.body;

  let user = await registerSchema.findOne({ email: body.email })

  if(user) return res.status(400).json("User already exist");

  let uniqueUser: create | any = new registerSchema({ ...body, createdAt: new Date().toISOString() });

  const salt = await bcrypt.genSalt(10);

  uniqueUser.password = await bcrypt.hash(uniqueUser.password, salt);

  try {

    await uniqueUser.save();

    const token = uniqueUser.generateAuthToken();

    return res.header("x-auth-token", token).json(uniqueUser);

  } catch (error: any) {
    return res.status(409).json(error.message)
  }
}

export default {
  getAllAccountRegistered,
  getUser,
  createRegisteredAccount
}
