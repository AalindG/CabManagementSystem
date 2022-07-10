import express from 'express'
import DriverController from '../controller/driver.js'

const DriverRouter = express.Router()

const { changeCityForDriver, onboardDriver } = DriverController

DriverRouter.post('/onboard', onboardDriver)
DriverRouter.post('/change-city', changeCityForDriver)

export default DriverRouter
