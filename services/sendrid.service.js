const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
let msg
const sendgrid = async (data) => {
    msg = {
        to: data.email, // Change to your recipient
        from: 'khokharinderjeetkaur@gmail.com', // Change to your verified sender
        subject: 'Sennpm i multerding with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    console.log("sending email")
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
// const msg = {
//     to: 'test@example.com', // Change to your recipient
//     from: 'test@example.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

module.exports = sendgrid