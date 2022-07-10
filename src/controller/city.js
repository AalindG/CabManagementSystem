import CityModel from '../model/city.js'

const CityController = {
  onboardCity

}

export default CityController

async function onboardCity (request, response, next) {
  try {
    const { body } = request

    const result = await CityModel.onboardCity(body)

    console.log('City Successfully onboarded')

    response.status(200).json(result)
  } catch (error) {
    console.log('Error onboarding city: ', error)
    next(error)
  }
}
