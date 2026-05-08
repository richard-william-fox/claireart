import nodemailer from 'nodemailer'

const sendOrderEmail = (error = null) => {

    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "root@tabletopsupercrew.net",
            pass: process.env.GOOGLE_APP_PASSWORD,
        }
    })

    const mailOptions = {
        from: 'root@tabletopsupercrew.net',
        to: process.env.ADMIN_EMAIL,
    }

    if (!error) {
        mailOptions.subject = 'New sale'
        mailOptions.text = 'There has been a new order completed on Claire Fox Creations! Log into paypal business to see more details.\n'
    } else {
        mailOptions.subject = 'Order error'
        mailOptions.text = 'There was an error processing an order on Claire Fox Creations. Follow up may be needed. Please see error details.\n' +
            'Email: ' + error.email + '\n' +
            'Transactions: ' + error.transactions + '\n'
    }

    smtpTransport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

export default sendOrderEmail
