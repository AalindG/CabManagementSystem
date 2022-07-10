import * as redis from 'redis'
import { promisify } from 'util'

// create redis client
export const client = redis.createClient({
  url: process.env.REDIS_URL,
  socket: { connectTimeout: 10000 },
  legacyMode: true
})

export const hSetAsync = promisify(client.hSet).bind(client)
export const hGetAsync = promisify(client.hGet).bind(client)
