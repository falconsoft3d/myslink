import dbConnect from '../../../db/dbConnect';
import Url from '../../../models/Url';
import { verifyTokenAndAuthorization } from "../../../utils/verifyToken";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect();
  // Verify the Id user
  const url = await Url.findById(id)
  if (!url) return res.status(400).json({ success: false })
  verifyTokenAndAuthorization(req, res, url.userId);

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        res.status(200).json({ success: true, data: url })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const url = await Url.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!url) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: url })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedUrl = await Url.deleteOne({ _id: id })
        if (!deletedUrl) {
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