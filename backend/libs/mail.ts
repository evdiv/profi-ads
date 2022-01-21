import { createTransport, getTestMessageUrl } from 'nodemailer'

const transport = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

function buildEmailBody(text:string) {
    return `
    <div className="email" style="border: 1px solid black; padding: 10px;">
      <p>${text}</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(token:string, to:string) {
    // email the user a token
    const info = (await transport.sendMail({
        to,
        from: `noreply@${process.env.DOMAIN}`,
        subject: 'Your password reset token!',
        html: buildEmailBody(`Your Password Reset Token: 
      <a href="${process.env.DOMAIN_URL}/reset?token=${token}">Click Here to reset</a>`),
    }));

    if (process.env.MAIL_USER?.includes('ethereal.email')) {
        console.log(`Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
    }
}