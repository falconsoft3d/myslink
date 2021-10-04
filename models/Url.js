import mongoose from 'mongoose'

const UrlSchema = new mongoose.Schema({
  url: String,
  shortened: String,
  clicks: { type: Number, default: 0},
},  { timestamps: true })

module.exports = mongoose.models.Url || mongoose.model('Url', UrlSchema)
