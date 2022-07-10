import express from 'express'
import CityController from '../controller/city.js'

const CityRouter = express.Router()

const { onboardCity } = CityController

CityRouter.post('/onboard', onboardCity)

export default CityRouter
