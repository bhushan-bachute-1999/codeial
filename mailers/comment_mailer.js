const nodeMailer = require('../config/node_mailer');

exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/comment_mail.ejs');

    let mailOptions = {
        from: 'testing.cn.1999@gmail.com',
        to: comment.user.email,
        subject: 'New comment published',
        html: htmlString
        // text: "Hi Bhushan, You have commented successfully!!!"
    }
    nodeMailer.transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(`Error in sending the email`, err);
            return;
        }
        console.log('Message sent!', info);
    });
}