//get email
// get that user
// give the password refresh link

import { Response, Request } from "express";
import { UserModel } from "../../database/Schema";
import { ErrorLoader, ResultLoader } from "../Helper";
import jwt from "jsonwebtoken";
import { SMTPClient, Message } from "emailjs";

const SendPassWordResetLink = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const findByEmail = await UserModel.findOne({ email });

    if (!findByEmail) {
      throw new Error("In valid Email");
    }

    const user: any = { data: findByEmail, isReset: true };

    const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET || "");

    const client = await new SMTPClient({
      user: process.env.EMAIL,
      password: process.env.EMAIL_PASSWORD,
      host: "smtp.gmail.com",
      ssl: true,
    });

    const message = new Message({
      from: process.env.EMAIL,
      to: email,
      subject: "password Reset",
      attachment: [
        {
          data: `<h2>HI, Your Password Reset Info For TwitterMaster </h2>
                     <h2> UserName:${findByEmail.name}</h2>
                     <h3>Link: <a href="${process.env.WEBSITE_LINK}/password_reset/${token}"> hear</a> </h3>
                     `,
          alternative: true,
        },
      ],
    });
    await client.sendAsync(message);

    res.status(200).send(ResultLoader("Done", "Send"));
  } catch (e: any) {
    console.log(e);
    res.status(404).send(ErrorLoader("Email not found", e.message));
  }
};

export { SendPassWordResetLink };
