import nodemailer from 'nodemailer';

// Create a test account or use provided SMTP credentials
// We will use Ethereal Email for testing if no environment variables are present.
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    // Generate test account if no credentials provided in env
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || testAccount.user, // generated ethereal user
        pass: process.env.SMTP_PASS || testAccount.pass, // generated ethereal password
      },
    });

    const info = await transporter.sendMail({
      from: '"Loan Processing System" <noreply@loansystem.com>',
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    if (!process.env.SMTP_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
