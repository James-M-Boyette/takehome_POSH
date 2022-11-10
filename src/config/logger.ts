import eventEmitter from 'events'
import fs from 'fs'
import {Request} from 'express'

class Logger extends eventEmitter {
  log(msg: string, req: Request) {
    return
  }
}

export default Logger
