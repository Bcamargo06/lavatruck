exports.enviarEmail = async function (data) {
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: process.env.server_mail,
        port: process.env.port_mail,
        secure: true,
        auth: {
            user: process.env.user_mail,
            pass: process.env.pass_mail,
        },
    });

    let {
        from = "fasolo.hipot@gmail.com",
        to,
        bcc = "fasolo.hipot@gmail.com",
        subject = "Arquivo referente ao orçamento solicitado - Fasolo Engenharia.",
        text,
        html = '<p>Ol&aacute;, Em anexo Orçamento solicitado. <p>&nbsp;</p> <p><small>By <a href="https://www.linkedin.com/in/alyson-siqueira-309374127/" target="_blank" rel="noopener">Jes Consultoria</a></small></p>',
        attachments
    } = data;

    // send mail with defined transport object
    await transporter.sendMail({
        from: from,
        to: to,
        bcc: bcc,
        subject: subject,
        text: text,
        html: html,
        attachments: attachments
    });
}