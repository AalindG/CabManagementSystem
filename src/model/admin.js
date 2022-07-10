import Admin from '../schema/admin.js'

import crypto from 'crypto'
import CustomError from '../helpers/customError.js'
import { hSetAsync } from '../helpers/redis.helper.js'

function generateApiKey (adminIdentifier) {
  return adminIdentifier + '_' + crypto.randomUUID()
}

async function _generateAdminIdentifier (adminName, startingIndex = 0) {
  const adminIdentifier = adminName.substring(startingIndex, (startingIndex + 3)).toUpperCase()

  const adminDetails = await Admin.findOne({ adminIdentifier })

  if (adminDetails) {
    return _generateAdminIdentifier(adminName, (startingIndex + 1))
  }
  return adminIdentifier
}

async function registerAdmin (attrs, seeding = false) {
  const {
    name
  } = attrs

  const adminIdentifier = await _generateAdminIdentifier(name)

  const apiKey = generateApiKey(adminIdentifier)

  const adminDetails = await Admin.create({
    name,
    adminIdentifier,
    apiKey
  })

  const redisHash = process.env.REDIS_ADMIN_MAP
  if (process.env.CACHE_ENABLED === 'true' && !seeding) await hSetAsync(redisHash, apiKey, adminIdentifier)

  return adminDetails
}

async function getAllAdmins () {
  const adminDetails = await Admin.find({})
  if (adminDetails.length === 0) {
    throw new CustomError('No Admins Found.')
  }
  return adminDetails
}

async function findAdmin (apiKey) {
  const adminDetails = await Admin.findOne({ apiKey })

  if (!adminDetails) {
    throw new CustomError('Admin Not Found.')
  }
  return adminDetails
}

const AdminModel = {
  registerAdmin,
  getAllAdmins,
  findAdmin
}

export default AdminModel
