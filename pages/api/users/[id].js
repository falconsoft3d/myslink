import dbConnect from '../../../db/dbConnect';
import User from '../../../models/User';
import { verifyToken } from "../../../utils/verifyToken";
const CryptoJS = require("crypto-js");

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()
  
  verifyToken(req, res)
  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const user = await User.findById(id)
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false, error:error  })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        if (req.body.password) {
          req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
          ).toString()
        }
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedUser = await Url.deleteOne({ _id: id })
        if (!deletedUser) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}