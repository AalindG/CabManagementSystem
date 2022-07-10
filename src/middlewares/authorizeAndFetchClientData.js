import CustomError from '../helpers/customError.js'
import { hGetAsync } from '../helpers/redis.helper.js'
import AdminModel from '../model/admin.js'

async function verifyClient (request, response, next) {
  try {
    // await client.connect()
    const apiKey = request.get('apiKey')

    if (!apiKey) {
      const error = new CustomError('Auth tokens missing', 401)
      next(error)
      return
    }

    let adminIdentifier

    if (process.env.CACHE_ENABLED === true) {
      adminIdentifier = await hGetAsync(process.env.REDIS_ADMIN_MAP, apiKey)
    }
    if (!adminIdentifier) adminIdentifier = await AdminModel.findAdmin(apiKey)

    if (!adminIdentifier) {
      const error = new CustomError('Admin not authorised', 401)
      next(error)
      return
    }

    request.body.adminIdentifier = adminIdentifier
    request.body.apiKey = apiKey
    next()
  } catch (error) {
    next(error)
  }
}

export { verifyClient }
