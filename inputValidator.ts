
import {Request, Response, NextFunction } from "express";
import z, { AnyZodObject } from "zod";
//const schema = z.Schema
 export const balance = z.object({
  body: z.object({
      balance: z
        .number({
          required_error: "Balance is required and must be number",
      })
  }),
})

export const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
};


export const transaction = z.object({
  body: z.object({

    senderAccount: z
      .number({
        required_error: "Sender account number is required and must be number",
      }),

      recieverAccount: z
      .number({
        required_error: "Receiver account number is required and must be number",
      }),

      amount: z.number({
        required_error: "amount is required and must be number",
      }),

      transferDescription: z.string({
        required_error: "transfer description is required and must be string",
      }),
  }),
});


export const register = z.object({
  body: z.object({

    name: z
      .string({
        required_error: "name not acceptable",
      }),

      email: z
      .string({
        required_error: "Email unacceptable",
      }),

      password: z
      .string({
        required_error: "password does not meet the required standard",
      })
  }),
});
