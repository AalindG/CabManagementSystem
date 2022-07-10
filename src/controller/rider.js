import RiderModel from '../model/rider.js'

const RiderController = {
  onboardRider

}

export default RiderController

async function onboardRider (request, response, next) {
  try {
    const { body } = request

    const result = await RiderModel.onboardRider(body)

    console.log('Rider Successfully onboarded')

    response.status(200).json(result)
  } catch (error) {
    console.log('Error onboarding rider: ', error)
    next(error)
  }
}
