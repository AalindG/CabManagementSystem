import TRIP_STATUS from '../constants/tripStatus.js'
import CustomError from '../helpers/customError.js'
import Trips from '../schema/trip.js'
import CityModel from './city.js'
import { estimateCost } from './costEstimate.js'
import DriverModel from './driver.js'

const TripModel = {
  createTrip,
  startTrip,
  markTripComplete,
  getActiveTrips,
  getAllTrips
}

export default TripModel

async function createTrip (attrs) {
  const { fromCity, toCity, riderId } = attrs

  const [
    toCityObj,
    fromCityObj
  ] = await Promise.all([
    CityModel.getActiveCity(toCity),
    CityModel.getActiveCity(fromCity)
  ])

  const {
    _id: toCityId
  } = toCityObj

  const {
    _id: fromCityId
  } = fromCityObj

  console.log('from: ', fromCityId)
  console.log('to: ', toCityObj)

  const driverObject = await DriverModel.getIdleDriver({ cityId: fromCityId.toString() })

  const {
    _id: driverId
  } = driverObject

  const tripCostBreakup = estimateCost(fromCity, toCity)

  const { total: tripCost } = tripCostBreakup

  const tripObject = await Trips.create({
    driver: driverId,
    rider: riderId,
    fromCity: fromCityId,
    toCity: toCityId,
    tripCost,
    tripCostBreakup
  })

  await DriverModel.assignTripToDriver({ driverId })

  return tripObject
}

async function startTrip (attrs) {
  const { tripId } = attrs
  const tripObject = await Trips.findByIdAndUpdate(tripId, { tripStatus: TRIP_STATUS.MAP.IN_PROGRESS }, { new: true })
  return tripObject
}

async function markTripComplete (attrs) {
  const { tripId } = attrs

  const tripObject = await Trips.findByIdAndUpdate(tripId, { tripStatus: TRIP_STATUS.MAP.TRIP_COMPLETED, tripCompletionTime: new Date().toISOString() }, { new: true })

  if (!tripObject) {
    throw new CustomError('Trip not found')
  }

  const { driver: driverId } = tripObject

  const { toCity } = tripObject

  await DriverModel.markDriverAsIdleOnTripCompletion({ driverId, cityId: toCity })
  return tripObject
}

async function _getTrips (query) {
  return Trips.find(query)
}

async function getActiveTrips () {
  return _getTrips({ tripStatus: TRIP_STATUS.MAP.IN_PROGRESS })
}

async function getAllTrips () {
  return _getTrips({})
}
