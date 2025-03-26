import User from "@/models/user.Model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TO DO  configure mail for usage  we only design mailer but doesn't describe the mailer how to work
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        //  adding the token value and its expiry  in our database
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        ForgotPasswordToken: hashedToken,
        ForgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "06889761f8d5ea",
        pass: "cf5fcb711472f5",
      },
    });

    //

    const mailOptions = {
      from: "uditj66@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your password", // Subject line
      html: `<p>click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a>to ${
        emailType === "VERIFY" ? "verify your mail" : "reset your password"
      } or copy and paste the link below in your browser <br>${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`, // html body
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// const htmlBodyForVerify = `<p>click <a href="${
//     process.env.DOMAIN
//   }/verifyemail?token=${hashedToken}">here</a>to ${
//     emailType === "VERIFY" ? "verify your mail" : "reset your password"
//   } or copy and paste the link below in your browser <br>${
//     process.env.DOMAIN
//   }/verifyemail?token=${hashedToken}</p>`;

//   const htmlBodyForReset = `<p>click <a href="${
//     process.env.DOMAIN
//   }/reset?token=${hashedToken}">here</a>to ${
//     emailType === "RESET" ? "reset your password" : "verify your mail"
//   } or copy and paste the link below in your browser <br>${
//     process.env.DOMAIN
//   }/reset?token=${hashedToken}</p>`;
