import Rider from '../schema/rider.js'

const RiderModel = {
  onboardRider
}

export default RiderModel

async function onboardRider(attrs) {
  const {
    name,
    phoneNumber,
    email
  } = attrs

  const insertObject = {
    name,
    phoneNumber,
    email,
    isPhoneVerified: true,
    isEmailVerified: true
  }

  const rider = await Rider.create(insertObject)
  return rider
}
