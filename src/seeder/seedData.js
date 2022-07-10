import Bluebird from 'bluebird'

import CityModel from '../model/city.js'
import DriverModel from '../model/driver.js'
import drivers from './drivers.json' assert {type: 'json'}
import admins from './admins.json' assert {type: 'json'}
import AdminModel from '../model/admin.js'
import events from '../helpers/event.helper.js'

async function seedCities() {
  const cityArrayToSeed = ['Pune', 'Mumbai', 'Bangalore']

  await Bluebird.map(cityArrayToSeed, city => CityModel.onboardCity({ city }))
  console.log('City data seeded')
}

async function seedDrivers() {
  await Bluebird.map(drivers, _drivers => DriverModel.onboardDriver(_drivers))
  console.log('Driver data seeded')
}

async function seedAdmin() {
  try {
    await Bluebird.map(admins, _admin => AdminModel.registerAdmin(_admin, true), { concurrency: 1 })
    console.log('Admin data seeded')
    return true
  } catch (err) {
    return false
  }
}

async function seedData() {
  await seedCities()
  await seedDrivers()
  await seedAdmin()
    .then(res => {
      if (res && process.env.CACHE_ENABLED === 'true') {
        events.emit('populateRedis')
      }
    })
}

export default seedData
