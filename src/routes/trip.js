import express from 'express'
import TripController from '../controller/trip.js'

const TripRouter = express.Router()

const { createTrip, startTrip, markTripComplete, getActiveTrips, getAllTrips } = TripController

TripRouter.post('/create', createTrip)
TripRouter.post('/start', startTrip)
TripRouter.post('/mark-complete', markTripComplete)
TripRouter.get('/', getAllTrips)
TripRouter.get('/active', getActiveTrips)

export default TripRouter
