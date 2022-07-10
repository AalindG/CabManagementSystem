import DRIVER_STATUS from '../constants/driverStatus.js'

import mongoose from 'mongoose'
const { Schema } = mongoose

const CarDetails = new mongoose.Schema({
  make: { type: String, default: '' },
  vehicleNumber: { type: String, default: '' }
}, { _id: false })

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },

  phoneNumber: { type: String, required: true, unique: true },
  isPhoneVerified: { type: Boolean, default: false },

  carDetails: { type: CarDetails, required: true },
  // documents: { type: OnboardingDocumentsDriver, default: {} }, // documents: [{ POI }, { POA }]

  city: { type: Schema.Types.ObjectId, ref: 'Cities' },

  status: { type: String, enum: DRIVER_STATUS.ENUM, default: DRIVER_STATUS.DEFAULT },

  lastBookingAt: { type: Date, default: (new Date().toISOString()) }

}, { timestamps: true })

const Driver = mongoose.model('Driver', driverSchema)

export default Driver
