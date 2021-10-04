import dbConnect from '../../../db/dbConnect';
import Url from '../../../models/Url';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const url = await Url.findOne({ shortened: id})
        if (!url) {
          return res.status(400).json({ success: false })
        }
        const updateurl =   Url.findOneAndUpdate({_id :url.id}, {$inc : {'clicks' : 1} }).exec();
        res.status(200).json({ success: true, data: url })
      } catch (error) {
          console.log(error)
          res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}