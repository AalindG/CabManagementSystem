import EventEmitter from 'events'
import seedData from '../seeder/seedData.js'
import CustomError from './customError.js'

import { hSetAsync, client } from './redis.helper.js'
import AdminModel from '../model/admin.js'

const events = new EventEmitter()

events.on('seedData', async () => {
  try {
    console.log('Data seeding event...')
    await seedData()
  } catch (error) {
    console.log('Unable to populate db.', error)
    throw new CustomError('Unable to populate Db.')
  }
})

export default events

events.on('populateRedis', async () => {
  try {
    // eslint-disable-next-line no-extra-boolean-cast
    if (process.env.CACHE_ENABLED === 'false') {
      console.log('Cache Disabled')
      return
    }
    console.log('Populating cache...')
    await client.connect()
    const admins = await AdminModel.getAllAdmins()

    const redisHash = process.env.REDIS_ADMIN_MAP

    const redisData = admins.map(({ apiKey, adminIdentifier }) => ({ key: apiKey, value: adminIdentifier }))

    const promiseArray = redisData.map(({ key, value }) => hSetAsync(redisHash, key, value))

    await Promise.all(promiseArray).then(res => {
      console.log('Redis populated: ', res)
    })
  } catch (error) {
    console.log('Unable to populate redis.', error)
    throw error
  }
})
