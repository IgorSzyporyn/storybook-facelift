/* eslint-disable no-console */
import { ADDON_ID } from '../constants'

const noop = () => false

const messenger = {
  warn: (console && console.warn) || noop,
  info: (console && console.info) || noop,
  error: (console && console.error) || noop,
  log: (console && console.log) || noop,
}

type OutputLevel = 'log' | 'warning' | 'info' | 'error'

export const output = (message: string, level?: OutputLevel) => {
  const msg = `${ADDON_ID}: ${message}`

  switch (level) {
    case 'warning':
      messenger.warn(msg)
      break
    case 'info':
      messenger.info(msg)
      break
    case 'error':
      messenger.error(msg)
      break
    case 'log':
    default:
      messenger.log(msg)
      break
  }
}
