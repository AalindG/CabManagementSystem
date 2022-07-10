import CustomError from '../helpers/customError.js'
import DriverModel from '../model/driver.js'

const DriverController = {
  onboardDriver,
  assignTripToDriver,
  changeCityForDriver
}

export default DriverController

async function onboardDriver (request, response, next) {
  try {
    const { body } = request

    const result = await DriverModel.onboardDriver(body)

    console.log('Driver Successfully Onboarded')

    response.status(200).json(result)
  } catch (error) {
    console.log('Error onboarding driver: ', error)
    next(error)
  }
}

async function assignTripToDriver (request, response, next) {
  try {
    const { body } = request

    const result = await DriverModel.assignTripToDriver(body)

    console.log('Trip Assigned To Driver')

    response.status(200).json(result)
  } catch (error) {
    console.log('Unable to assign trip: ', error)
    const _err = new CustomError('Unable to assign trip', 500, error)
    next(_err)
  }
}

async function changeCityForDriver (request, response, next) {
  try {
    const { body } = request

    const result = await DriverModel.changeCityForDriver(body)

    console.log('City Changed For Driver')

    response.status(200).json(result)
  } catch (error) {
    console.log('Unable to change city for the driver: ', error)
    const _err = new CustomError('Unable to change city for the driver', 500, error)
    next(_err)
  }
}
