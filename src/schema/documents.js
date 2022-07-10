import mongoose from 'mongoose'


const Document = new mongoose.Schema({
  s3Details: { type: Object, default: {} },
  documentName: { type: String, default: {} }
})

const OnboardingDocumentsDriver = new mongoose.Schema({
  POI: { type: Document, default: {} },
  POA: { type: Document, default: {} }
})
const OnboardingDocumentsRider = new mongoose.Schema({
  POI: { type: Document, default: {} }
})

const TripDocuments = new mongoose.Schema({
  receipt: { type: Document, default: {} }
})

export {
  OnboardingDocumentsDriver,
  OnboardingDocumentsRider,
  TripDocuments
}
