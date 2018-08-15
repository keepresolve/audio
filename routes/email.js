var nodemailer = require('nodemailer');

exports.sendmail = function (req, res, next) {
    var { user, password, message, to } = req.body
    //检测邮箱地址是否为空
    if (!to) {
        return res.send({ message: "请输入邮箱地址！" });
    }
    //检测邮箱地址是否符合规范
    var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
    if (!to.match(reg)) {
        return res.send({ message: "邮箱地址不符合规范，请重新输入！" });
    }
    if (!user) {
        return res.send({ message: "用户名不能为空" });
    }
    if (!password) {
        return res.send({ message: "密码不能为空" });
    }
 
    //邮件发送
    var transporter = nodemailer.createTransport({
        service: '163',
        auth: {
            user,//你的163邮箱账号
            pass: password//你的163邮箱密码
        }
    });
    var mailOptions = {
        from: user + '@163.com', // sender address
        to: to, // list of receivers
        subject: '测试邮件', // Subject line
        text: 'Nodejs之邮件发送', // plaintext body
        html: "<h2>"+message+"</h2>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (!error) {
            return res.send({ message: "邮件发送成功，请注意查收！" });
        } else {
            console.log(error);
            return res.send({ message: "邮件发送失败，请稍后重试！" });
        }
    });
}