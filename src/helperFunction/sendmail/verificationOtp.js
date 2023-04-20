// import nodemailer from 'nodemailer';

// export function sendVerificationOtp(receiverEmail,msg) {
//     const transporter = nodemailer.createTransport({
//         port: 465,
//         host: "smtp.gmail.com",
//         auth: {
//             user: 'hostellers.team@gmail.com',
//             pass: 'suqpgwpfhajzbtba',
//         },
//         secure: true,
//     })
//     const mailData = {
//         from: 'hosteller.team@gmail.com',
//         to: receiverEmail,
//         subject: `Message From Team Hostellers`,
//         text: msg 
//     }
//     transporter.sendMail(mailData, function (err, info) {
//         if (err)
//             console.log(err)
//         else
//             console.log('email sent')
//     })
// }