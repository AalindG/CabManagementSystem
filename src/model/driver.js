import mongoose from 'mongoose'
import DRIVER_STATUS from '../constants/driverStatus.js'
import CustomError from '../helpers/customError.js'
import Driver from '../schema/driver.js'
import CityModel from './city.js'

const DriverModel = {
  onboardDriver,
  markDriverAsIdleOnTripCompletion,
  getIdleDriver,
  assignTripToDriver,
  changeCityForDriver
}

export default DriverModel

async function onboardDriver (attrs) {
  const {
    name,
    phoneNumber,
    city,
    carDetails
  } = attrs

  const cityObject = await CityModel.getActiveCity(city)
  console.log('coj=j: ', cityObject)

  const { _id: cityId } = cityObject

  const driver = Driver.create({
    name,
    phoneNumber,
    city: cityId,
    carDetails
  })

  return driver
}

async function changeCityForDriver (attrs) {
  const { city, driverId } = attrs

  const cityObject = await CityModel.getActiveCity({ city })
  const {
    _id: cityId
  } = cityObject

  const driver = await Driver.findByIdAndUpdate(driverId, { city: cityId })
  return driver
}

async function markDriverAsIdleOnTripCompletion (attrs) {
  const { driverId, cityId } = attrs

  const updateObject = {
    status: DRIVER_STATUS.MAP.IDLE,
    lastBookingAt: (new Date().toISOString()),
    city: cityId
  }

  const driver = await Driver.findByIdAndUpdate(driverId, updateObject)
  return driver
}

async function assignTripToDriver (attrs) {
  const { driverId } = attrs

  const updateObject = {
    status: DRIVER_STATUS.MAP.ON_TRIP
  }

  const driver = await Driver.findByIdAndUpdate(driverId, updateObject)
  return driver
}

async function getIdleDriver (attrs) {
  const { cityId } = attrs
  console.log('cityId', cityId)

  const queryObject = {
    city: mongoose.Types.ObjectId(cityId),
    status: DRIVER_STATUS.MAP.IDLE
  }

  console.log('queryObject: ', queryObject)

  const driversAvailable = await Driver.find(queryObject)
    .sort({ lastBookingAt: 1 }).limit(1)

  console.log('driversAvailable: ', driversAvailable)

  if (driversAvailable.length === 0) {
    throw new CustomError('Drivers unavailable at the moment.')
  }

  return driversAvailable[0]
}
