import dbConnect from '../../../db/dbConnect';
import Url from '../../../models/Url';

export default async function handler(req, res) {
    const { method } = req
  
    await dbConnect()
  
    switch (method) {
      case 'GET':
        try {
          const urls = await Url.find({}) /* find all the data in our database */
          res.status(200).json({ success: true, data: urls })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      case 'POST':
        try {
          const shortened = Math.random().toString(36).substr(2, 7);
          const data = req.body
          console.log("data:", data)
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