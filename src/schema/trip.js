import mongoose from 'mongoose'

import ALLOWED_PAYMENT_METHODS from '../constants/paymentMethods.js'
import TRIP_STATUS from '../constants/tripStatus.js'
const { Schema } = mongoose

const TripBreakup = new mongoose.Schema({
  distance: { type: Number, default: 0 },
  costForDistance: { type: Number, default: 0 },
  tolls: { type: Number, default: 0 },
  costForTolls: { type: Number, default: 0 },
  gst: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
}, { _id: false })

const tripSchema = new mongoose.Schema({
  rider: { type: Schema.Types.ObjectId, ref: 'Rider' },
  driver: { type: Schema.Types.ObjectId, ref: 'Driver' },

  tripStatus: { type: String, enum: TRIP_STATUS.ENUM, default: TRIP_STATUS.DEFAULT },
  tripCost: { type: Number, default: 0 },
  tripCostBreakup: { type: TripBreakup, default: {} },
  fromCity: { type: Schema.Types.ObjectId, ref: 'Cities' },
  toCity: { type: Schema.Types.ObjectId, ref: 'Cities' },

  paymentMethod: { type: String, enum: ALLOWED_PAYMENT_METHODS.ENUM, default: ALLOWED_PAYMENT_METHODS.DEFAULT },

  tripCompletionTime: { type: Date, default: '' }
}, { timestamps: true })

const Trips = mongoose.model('Trips', tripSchema)

export default Trips
