// import { OnboardingDocumentsRider } from './documents'

import mongoose from 'mongoose'

const riderSchema = new mongoose.Schema({
  name: { type: String, required: true },

  phoneNumber: { type: String, required: true },
  isPhoneVerified: { type: Boolean, default: false },
  email: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: false }

  // documents: { type: OnboardingDocumentsRider, default: {} }
}, { timestamps: true })

const Rider = mongoose.model('Rider', riderSchema)

export default Rider
