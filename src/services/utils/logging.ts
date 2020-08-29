import { Settings } from '../settings'

export const log = (...args: any[]) => {
  if (Settings.logsEnabled) {
    console.log(...args)
  }
}
