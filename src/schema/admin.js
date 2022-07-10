import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adminIdentifier: { type: String, required: true },
  apiKey: { type: String, required: true }
}, { timestamps: true })

const Admin = mongoose.model('Admin', AdminSchema)

export default Admin
