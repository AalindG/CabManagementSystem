import CustomError from '../helpers/customError.js'
import AdminModel from '../model/admin.js'

const AdminController = {
  registerAdmin,
  getAllAdmins
}

export default AdminController

async function registerAdmin (request, response, next) {
  try {
    const { body } = request

    const result = await AdminModel.registerAdmin(body)

    console.log('Admin Registered')

    response.status(200).json(result)
  } catch (error) {
    console.log('Error Registering admin: ', error)
    const _err = new CustomError('Error Registering admin: ', 500, error)
    next(_err)
  }
}

async function getAllAdmins (request, response, next) {
  try {
    const { body } = request

    const result = await AdminModel.getAllAdmins(body)

    response.status(200).json(result)
  } catch (error) {
    console.log('Cannnot fetch admins: ', error)
    const _err = new CustomError('Cannnot fetch admins: ', 500, error)
    next(_err)
  }
}
