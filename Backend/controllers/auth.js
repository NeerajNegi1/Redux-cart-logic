const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const saltRounds = 10;

exports.signup = (req, res) => {

    const { fName, lName, email, password } = req.body

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegexp.test(email)) {
        res.json({
            message: 'Email Is not Valid'
        })
    } else {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                res.json({
                    message: 'Something Bad Happened'
                })
            }
            if (user) {
                res.json({
                    message: 'User Already Registered'
                })
            }
            if (!user) {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {

                        const token = jwt.sign({ fName, lName, email, hash }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

                        // async..await is not allowed in global scope, must use a wrapper
                        async function main() {

                            // create reusable transporter object using the default SMTP transport
                            let transporter = nodemailer.createTransport({
                                host: "smtp.ethereal.email",
                                port: 587,
                                secure: false, // true for 465, false for other ports
                                auth: {
                                    user: "dawn.parisian@ethereal.email", // generated ethereal user
                                    pass: "3ajsxcrQN5d5QCbB7x", // generated ethereal password
                                },
                            });

                            const emailData = await transporter.sendMail({
                                from: process.env.EMAIL_FROM,
                                to: email,
                                subject: `Account Activation Link`,
                                text: 'Account Activation',
                                html: `
                                    <h1>Please use the following link to activate your account</h1>
                                    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                                    <hr />
                                    <p>This email contain important information. Please do not share this link with anybody else.</p>
                                    <p>${process.env.CLIENT_URL}</p>
                                `
                            })

                            if (emailData.messageId) {
                                res.json({
                                    message: `An Account Activation email is sent at your ${email}`
                                })
                            } else {
                                res.json({
                                    message: `Something wrong happened`
                                })
                            }

                            console.log("Message sent: %s", emailData.messageId);
                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                        }
                        main().catch(console.error);
                    });
                });
            }
        })
    }
}

exports.login = (req, res) => {

    const { email, password } = req.body


    User.findOne({ email: email }, function (err, user) {
        if (err) {
            res.json({
                message: 'Some error occured'
            })
        }
        if (!user) {
            res.json({
                message: 'You entered incorrect email and password.'
            })
        }
        if (user) {
            const checkPass = bcrypt.compareSync(password, user.hashed_password);
            if (checkPass) {
                res.json({
                    // message: 'You have logged in'
                    message: {
                        fName: user.fname,
                        lName: user.lname,
                        products: user.products,
                        role: user.role,
                        _id: user._id,
                        auth: true
                    }
                })
            } else {
                res.json({
                    message: 'You entered incorrect email and password.'
                })
            }
        }
    })
}

exports.activate = (req, res) => {
    const { token } = req.body
    //jwt verification and decode token
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
        if (err) {
            res.json({
                message: "Expired login link."
            })
        }
        if (decoded) {
            const { fName, lName, email, hash } = decoded;
            const user = new User({
                fname: fName,
                lname: lName,
                email: email,
                hashed_password: hash
            })
            user.save(function (err, result) {
                if (err) {
                    res.json({
                        message: 'You are not able to register. Please try again.'
                    })
                    // console.log("error", err)
                }
                else {
                    res.json({
                        message: 'You have been registered. Please Login.'
                    })
                    // console.log("result", result)
                }
            });
        }
    });
}