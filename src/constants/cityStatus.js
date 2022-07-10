import _ from 'lodash'

const MAP = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
}

const ENUM = _.values(MAP)

const DEFAULT = MAP.ACTIVE

const CITY_STATUS = {
  MAP,
  ENUM,
  DEFAULT
}

export default CITY_STATUS
