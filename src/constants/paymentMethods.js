import _ from 'lodash'

const MAP = {
  CASH: 'CASH',
  WALLET1: 'WALLET1',
  WALLET2: 'WALLET2',
  WALLET3: 'WALLET3'
}

const ENUM = _.values(MAP)

const DEFAULT = MAP.CASH

const ALLOWED_PAYMENT_METHODS = {
  MAP,
  ENUM,
  DEFAULT
}

export default ALLOWED_PAYMENT_METHODS
