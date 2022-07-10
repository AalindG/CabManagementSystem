import _ from 'lodash'

const MAP = {
  UNAVAILABLE: 'UNAVAILABLE',
  IDLE: 'IDLE',
  ON_TRIP: 'ON_TRIP',
  DORMANT: 'DORMANT'
}

const ENUM = _.values(MAP)

const DEFAULT = MAP.IDLE

const DRIVER_STATUS = {
  MAP,
  ENUM,
  DEFAULT
}

export default DRIVER_STATUS
