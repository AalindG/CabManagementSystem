import express from 'express'
import AdminController from '../controller/admin.js'

const AdminRouter = express.Router()

const { getAllAdmins, registerAdmin } = AdminController

AdminRouter.post('/register', registerAdmin)
AdminRouter.get('/register', getAllAdmins)

export default AdminRouter
