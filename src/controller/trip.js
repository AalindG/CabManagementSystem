import CustomError from '../helpers/customError.js'
import TripModel from '../model/trip.js'

const TripController = {
  createTrip,
  startTrip,
  markTripComplete,
  getActiveTrips,
  getAllTrips
}

export default TripController

async function createTrip (request, response, next) {
  try {
    const { body } = request

    const result = await TripModel.createTrip(body)

    console.log('Trip Successfully Created')

    response.status(200).json(result)
  } catch (error) {
    console.log('Error creating trip: ', error)
    const _err = new CustomError('Error creating trip', 500, error)
    next(_err)
  }
}

async function startTrip (request, response, next) {
  try {
    const { body } = request

    const result = await TripModel.startTrip(body)

    console.log('Trip Successfully Started')

    response.status(200).json(result)
  } catch (error) {
    console.log('Error started trip: ', error)
    const _err = new CustomError('Error started trip', 500, error)
    next(_err)
  }
}

async function markTripComplete (request, response, next) {
  try {
    const { body } = request

    const result = await TripModel.markTripComplete(body)

    console.log('Trip Marked Complete')

    response.status(200).json(result)
  } catch (error) {
    console.log('Unable to complete trip: ', error)
    next(error)
  }
}
async function getActiveTrips (request, response, next) {
  try {
    const { body } = request

    const result = await TripModel.getActiveTrips(body)

    response.status(200).json(result)
  } catch (error) {
    console.log('Unable to active fetch trips: ', error)
    const _err = new CustomError('Unable to active fetch trips.', 500, error)
    next(_err)
  }
}
async function getAllTrips (request, response, next) {
  try {
    const { body } = request

    const result = await TripModel.getAllTrips(body)

    response.status(200).json(result)
  } catch (error) {
    console.log('Unable to fetch trips: ', error)
    const _err = new CustomError('Unable to fetch trips.', 500, error)
    next(_err)
  }
}
