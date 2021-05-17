import { Parameters } from '../typings'

export type ElevationMap = {
  [key in Parameters.UIElevationTypes]: string
}

export const elevationMap: ElevationMap = {
  0: 'none',
  1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  4: '0 13px 24px rgba(0,0,0,0.19), 0 9px 9px rgba(0,0,0,0.23)',
}
