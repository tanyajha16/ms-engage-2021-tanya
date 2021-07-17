const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')

// The credentials of the Mail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'ms-Teams.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'msengageclone16@gmail.com',
        pass: '1234@tanya'
    }
});

// Rendering the Template
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}