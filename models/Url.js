import mongoose from 'mongoose'

const UrlSchema = new mongoose.Schema(
    {
    userId: { type: String, required: true },
    url: { type: String, required: true },
    shortened: { type: String, required: true },
    clicks: { type: Number, default: 0},
    },  
    { timestamps: true }
  )

module.exports = mongoose.models.Url || mongoose.model('Url', UrlSchema)
