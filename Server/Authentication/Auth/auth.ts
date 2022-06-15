
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import registerSchema from "../AuthSchemas/register";
import { validate } from "../../../inputValidator";

export const checkRegAuthForAccount
= async (req: Request, res: Response) => {

  try {

    validate(req.body);

    let user = await registerSchema.findOne({ email: req.body.email })

    if(!user) return res.status(400).json("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) return res.status(400).json("Invalid email or password");

    const token = await user.generateAuthToken();

    return res.status(200).json({token})
  } catch (error: any) {
    return res.status(409).json(error.message);
  }
}


export default {
  checkRegAuthForAccount
}
