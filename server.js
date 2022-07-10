import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'

import {
  AdminRouter,
  CityRouter,
  DriverRouter,
  RiderRouter,
  TripRouter
} from './src/routes/index.js'

import mongoose from 'mongoose'
import events from './src/helpers/event.helper.js'
import handleError from './src/middlewares/handleError.js'
import { verifyClient } from './src/middlewares/authorizeAndFetchClientData.js'

dotenv.config()

const PORT = process.env.PORT || ''

const app = express()

// Pre-middlewares
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(verifyClient)

// routes
app.use('/admin', AdminRouter)
app.use('/rider', verifyClient, RiderRouter)
app.use('/driver', verifyClient, DriverRouter)
app.use('/trip', verifyClient, TripRouter)
app.use('/city', verifyClient, CityRouter)

// Post-middlewares
app.use(handleError)

app.listen(PORT, async () => {
  const { MONGO_DBNAME, MONGO_HOSTS } = process.env
  await mongoose.connect(`mongodb://${MONGO_HOSTS}/${MONGO_DBNAME}`)
    .then(() => {
      console.log('Connected to DB.')
    })

  // Enable seeding of data using the flag in env
  if (process.env.SEED_DATA === 'true') {
    await mongoose.connection.db.dropDatabase(function (err, result) {
      if (err) {
        throw err
      }
      console.log('result: ', result)
      events.emit('seedData')
    })
  }

  console.log(`Server Started at ${PORT}`)
})

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
  console.log('Closing http server.')
  app.close(() => {
    console.log('Http server closed.')
    // boolean means [force], see in mongoose doc
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.')
    })
  })
})
