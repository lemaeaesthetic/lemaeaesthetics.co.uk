// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const TRANSPORT = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: Number(process.env.MAILER_PORT),
  secure: true,
  auth: {
    user: process.env.MAILER_SENDER,
    pass: process.env.MAILER_PASSWORD,
  },
});

const verifyNodeMailer = () =>
  // ensure transport is working
  new Promise((resolve, reject) => {
    ("Attempting to verify nodemailer config");

    TRANSPORT.verify((err, success) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Server ready to send mail");
        resolve(success);
      }
    });
  });

const validateField = (value: string, field: string): boolean => {
  let dateValid;
  switch (field) {
    case "name":
      return /^[\w -]+$/.test(value) && value.length > 2;
    case "phone":
      return /^[\d]+$/.test(value) && value.length >= 9;
    case "date":
      try {
        dateValid = Number(value) >= new Date().setHours(0, 0, 0, 0);
      } catch (e) {
        dateValid = false;
      }
      return dateValid;
    case "email":
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    default:
      return /^[^{}*#|\\\][]+$/.test(value);
  }
};

const validateFields = (obj: any) => {
  const keys = Object.keys(obj);

  return keys.reduce((output: any[], key) => {
    const field = obj[key];
    const isValid = validateField(field, key);
    if (!isValid) {
      output.push({ field: key, value: field });
    }
    return output;
  }, []);
};

const constructMessage = (body: any) => {
  return {
    from: `Contact From (${process.env.NEXT_PUBLIC_BASE_URL}) <${process.env.MAILER_SENDER}>`,
    to: process.env.MAILER_RECEIVER,
    replyTo: body.email,
    subject: `Enquiry from ${body.name} for ${body.treatment}`,
    text: `Name: ${body.name}\n\nPhone: ${body.phone}\n\nEmail: ${
      body.email
    }\n\nDate: ${new Date(Number(body.date)).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}\n\nTreatment: ${body.treatment}\n\n`,
    html: `<p>Name: ${body.name}</p><p>Phone: ${body.phone}</p><p>Email: ${
      body.email
    }</p><p>Treatment: ${body.treatment}</p><p>Date: ${new Date(
      Number(body.date)
    ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}</p>`,
  };
};

const sendMessage = (body: any): Promise<SMTPTransport.SentMessageInfo> => {
  const message = constructMessage(body);
  return new Promise((resolve, reject) => {
    // Send message
    TRANSPORT.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

const Book: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const body = JSON.parse(req.body);
    // Ensure we have a body
    const errors = validateFields(body);
    // Failed validation
    if (errors.length > 0) {
      console.log({
        success: false,
        data: {
          message: "VALIDATION_FAILED",
          details: errors,
        },
      });
      res.status(400).json({
        success: false,
        data: {
          message: "VALIDATION_FAILED",
          details: errors,
        },
      });
    } else {
      // Passed validation
      // Check nodemailer is all good
      await verifyNodeMailer();
      const result = await sendMessage(body);
      if (/250 ok/gi.test(result?.response)) {
        res.status(200).json({
          success: true,
          data: {
            ...result,
          },
        });
      } else {
        console.log({
          success: false,
          data: {
            message: "REQUEST_ERROR",
            details: result.response,
          },
        });
        res.status(401).json({
          success: false,
          data: {
            message: "REQUEST_ERROR",
            details: result.response,
          },
        });
      }
    }
  } catch (e: unknown) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: {
        message: "INTERNAL_ERROR",
        details: (e as Error).message,
      },
    });
  }
};

export default Book;
