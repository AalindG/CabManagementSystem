import express from 'express'
import RiderController from '../controller/rider.js'

const RiderRouter = express.Router()

const { onboardRider } = RiderController

RiderRouter.post('/onboard', onboardRider)

export default RiderRouter
