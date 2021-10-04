import dbConnect from '../../../db/dbConnect';
import User from '../../../models/User';
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
    const { method } = req
    await dbConnect()
    switch (method) {
      case 'POST':
        try {
            const user = await User.findOne({ email: req.body.email });            
            !user && res.status(401).json({ success: false, error: "Error 1: Wrong credentials!" })
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
              );
            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            
            OriginalPassword !== req.body.password &&
                res.status(401).json({ success: false, error: "Error 2: Wrong credentials!" })

                const accessToken = jwt.sign(
                    {
                      id: user._id,
                      isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SEC,
                    {expiresIn:"3d"}
                  );
              
             const { password, ...others } = user._doc;
             res.status(200).json({success: true, ...others, accessToken});

        } catch (error) {
          res.status(500).json({ success: false })
        }
        break
      
    default:
        res.status(400).json({ success: false })
        break
    }
  }