## Cab Management Syste
A complete backend portal to initiate trips and manage them.

## Features
* Register an admin
* Onboard driver
* Onboard rider
* Create a trip
* Mark trip as started
* Mark trip as complete
* Fetch all ongoing trips

## This app can be extended to the following: 
* Real-time tracker and cost using geolocation
* A payment system
* End to end KYC process for both riders and drivers
* Various documents like ride receipts, payment receipts etc
* Rating mechanism for each trip and rider
* A client facing application, where the client/rider books the cab and takes care of the journey of the trip till payment completion
* Analytics system on read-replica, since all the modules are loosely-coupled


## Technical specifications
The system includes the following:
* Authentication enables for each API
* Cache to speed up the auth process, which can be extended to various other process
* Data seeding on app start.
* Switch-based development, cache and seeding can be disabled usong .env
* Graceful shutdown in case of termination, which makes it easy to run behind Manager apps like PM2


## Find Attached
* flow.md - schema of various databses
* postman.json - Postman collection object [Cab Management.postman_collection.json]
* .env.sample - sample env file.

## Before running
Make sure you have the following installed on your system
* mongodb
* redis, in case cache is enabled in env
