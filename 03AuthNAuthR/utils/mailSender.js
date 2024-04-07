const nodemailer = require("nodemailer");


const mailSender = async (email,title,body) =>{
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        let mailInfo = transporter.sendMail({
            from:"Prafull Prince",
            to:`${email}`,
            title:`${title}`,
            html:`${body}`,
        });

        return info;
    }
    catch(error){
        console.log(error);
    }
}

