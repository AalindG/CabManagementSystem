import CITY_STATUS from '../constants/cityStatus.js'
import CustomError from '../helpers/customError.js'
import Cities from '../schema/cities.js'
import cityMapper from '../seeder/cities.json'  assert {type: 'json'}

const CityModel = {
  onboardCity,
  getActiveCity
}

export default CityModel

async function onboardCity(attrs) {
  const { city: cityToOnboard } = attrs

  const existingCity = await Cities.findOne({ city: cityToOnboard })

  if (existingCity) {
    return existingCity
  }
  console.log('cityToOnboard: ', cityToOnboard);
  const validCity = validateCity(cityToOnboard)

  if (!validCity) {
    throw new CustomError('Not a valid city.')
  }

  const {
    city,
    state
  } = validCity

  const cityObject = await Cities.create({ city, state })

  return cityObject
}

function validateCity(cityToOnboard) {
  return cityMapper.find(({ city }) => cityToOnboard === city)
}

async function getActiveCity(city) {
  console.log('c: ', city);
  const cityObject = await Cities.findOne({ city, status: CITY_STATUS.MAP.ACTIVE })

  if (!cityObject) {
    throw new CustomError('City not found or inactive')
  }

  return cityObject
}
