import { sendVerificationOtp } from "../../../helperFunction/sendmail/verificationOtp";

export default async function handler(req, res) {
    if(req.method === 'POST'){
        try {
            const {email, otp} = await req.body;
            const msg = "Verification OTP : " +otp+ "\n";
            // await sendVerificationOtp(email,msg);
            const transporter = nodemailer.createTransport({
                port: 465,
                host: "smtp.gmail.com",
                auth: {
                    user: 'hostellers.team@gmail.com',
                    pass: 'suqpgwpfhajzbtba',
                },
                secure: true,
            })
            const mailData = {
                from: 'hosteller.team@gmail.com',
                to: email,
                subject: `Message From Team Hostellers`,
                text: msg 
            }
            transporter.sendMail(mailData, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log('email sent')
            })
            return res.status(200).json({ msg:"otp send" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg:error })
        }
    }
}