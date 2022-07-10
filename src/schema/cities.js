import mongoose from 'mongoose'
import CITY_STATUS from '../constants/cityStatus.js'

const citiesSchema = new mongoose.Schema({
  city: { type: String, default: {}, unique: true },
  state: { type: String, default: {} },
  status: { type: String, enum: CITY_STATUS.ENUM, default: CITY_STATUS.DEFAULT }
})

const Cities = mongoose.model('Cities', citiesSchema)

export default Cities
