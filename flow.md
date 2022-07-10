## Onboarded Cities
* Schema
  - city
  - state
  - status

## Actor - Admin
Schema
  - name
  - apiKey [self-generated]
  - adminIdentifier [self-generated]

## Actor - Cab Driver
* Register
  Schema:
    - name
    - car details
    - phone_number [verification-required]
    - documents - [{POI}, {POA}]
    - city
    - status
    - average_rating
    - last_booking_at

## Actor - Rider
* Register
  Schema:
    - name
    - Personal details - phone, email [verification-required]
    <!-- - documents - {POI} -->

## Bookings
  Rider to Cab [many-to-many]
  Schema:
    - booking_id
    - rider_id
    - driver_id
    - booking_time
    - trip_status
    - trip_cost
    - trip_cost_breakup - {
        trip_charge
        tolls
        wait_time
        gst
        tip
      }
    - to_city
    - from_city
    - documents - {
        receipt
    }
    - payment_method
    - trip_completion_timestamp
    - trip_rating

## Ratings
* Schema

## Processes
* Onboarding - both actors
  - admin
  - register
  - kyc

## Booking
  - get location
  - find idle cabs
  - book the cab with longest idle time
  - else, book the nearest cab
  - create `booking`
  - update `booking` on completion
