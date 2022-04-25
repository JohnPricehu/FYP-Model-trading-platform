import nodemailer from 'nodemailer'

function sendEmail(
    email, title,more
    ){
    const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {
        user: '2524792204@qq.com',
        pass: 'nuiepftqamawebba' 
    }
});

    const mailOptions = {
            from: '2524792204@qq.com',
            to: email, 
            subject: title,
            text: more,

        };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('邮件发送成功 ID：', info.messageId);
    }); 
}

export {
    sendEmail
}
