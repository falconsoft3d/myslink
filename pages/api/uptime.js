import dbConnect from '../../db/dbConnect';

export default async function handler(req, res) {
    try {
        await dbConnect()
        res.status(200).json({success: true});
    } catch (error) {
        res.status(400).json({success: false, error: error});
    }
}