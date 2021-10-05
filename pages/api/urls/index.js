import dbConnect from '../../../db/dbConnect';
import Url from '../../../models/Url';
import { verifyToken } from "../../../utils/verifyToken";

export default async function handler(req, res) {
    const { method } = req
  
    await dbConnect();
    verifyToken(req, res);
    
    

    switch (method) {
      case 'GET':
        const idUser = req.query.iduser;
    if (!idUser) {
       res.status(400).json({ success: false, error: 'Invalid Query'})
    }
        try {
          const urls = await Url.find({
            userId: {
              $in: [idUser],
            },
          }).sort({ createdAt: -1 }) /* find all the data in our database */
          res.status(200).json({ success: true, data: urls })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      case 'POST':
        try {
          const shortened = Math.random().toString(36).substr(2, 7);
          const data = req.body
          const url = await Url.create({ clicks:0 ,  shortened ,...data})/* create a new model in the database */
          res.status(201).json({ success: true, data: url })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      default:
        res.status(400).json({ success: false })
        break
    }
  }