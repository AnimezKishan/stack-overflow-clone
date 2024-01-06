import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'
import nodemailer from 'nodemailer'

export const signup = async(req, res) => {
    const { name, email, password } = req.body;
    try{
        const existingUser = await users.findOne({ email });
        if(existingUser){
            return res.status(404).json({message: "User Already Exists."})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({ name, email, password: hashedPassword});
        const token = jwt.sign({ email: newUser.email, id:newUser._id }, process.env.JWT_SECERT, { expiresIn: '1h' });
        res.status(200).json({ result: newUser, token })
    }
    catch(error){
        res.status(500).json("Something went wrong...")
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body;
    try{
        const existingUser = await users.findOne({ email });
        if(!existingUser){
            return res.status(404).json({message: "User Don't Exists."})
        }

        const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCrt){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({ email: existingUser.email, id:existingUser._id }, process.env.JWT_SECERT, { expiresIn: '1h' });
        res.status(200).json({ result: existingUser, token })
    }
    catch(error){
        res.status(500).json("Something went wrong...")
    }
} 

export const logInfo = async(req, res) => {
    const { email, browser, os, device, ip } = req.body; 
    try {
        const existingUser = await users.findOne({ email });
        if(!existingUser){
            return res.status(404).json({message: "User don't exists."})
        }

        const updatedInfo = await users.findByIdAndUpdate(existingUser._id, { $addToSet: {'info': [{ browser, os, device, ip}]}});
        res.status(200).json(updatedInfo);
    } 
    catch (error) {
        res.status(400).json(error)
    }
}

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    const existingUser = await users.findOne({ email });
    if(!existingUser){
        return res.status(400).json({message: "User don't Exists."})
    }

    const token = jwt.sign({ email: existingUser.email, id:existingUser._id }, process.env.JWT_SECERT, { expiresIn: '1h' });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.USER,
        to: existingUser.email,
        subject: 'Reset Password Link',
        html: `
        <!doctype html>
        <html lang="en-US">
        
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password Email Template</title>
            <meta name="description" content="Reset Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
        
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                    requested to reset your password</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:250px;">From Stack Overflow Clone</span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    We cannot simply send you your old password. A unique link to reset your
                                                    password has been generated for you. To reset your password, click the
                                                    following link and follow the instructions.
                                                </p>
                                                <a href="https://stack-overflow-clone-kishan.netlify.app/ResetPassword/${existingUser._id}/${token}" target="_blank"
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                    Password</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
        
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        
        </html>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          return res.send({Status: "Success"})
        }
      });
}

export const resetPassword = async(req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    let decodeData = jwt.verify(token, process.env.JWT_SECERT);
    if(id === decodeData?.id){
        try {
            const hashedPassword = await bcrypt.hash(password, 12)
            await users.findByIdAndUpdate(id, {$set: {'password': hashedPassword}}) 
            res.status(200).send({Status: "Success"})
        } 
        catch (error) {
            res.status(500).send({Status: error})
        }
    }
}