import { useAddonState } from '@storybook/api'
import { Global, useTheme } from '@storybook/theming'
import React from 'react'
import { ADDON_ID } from '../constants'
import { Parameters, Settings } from '../typings'

type ElevationMap = {
  [key in Parameters.MainElevationTypes]: string
}

const elevationMap: ElevationMap = {
  0: 'none',
  1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
}

export const ManagerStyles = () => {
  const theme = useTheme()
  const [settings] = useAddonState<Settings.Settings>(ADDON_ID)

  const isReady = settings !== undefined

  if (!isReady) {
    return null
  }

  const { parameters } = settings
  const { main = {} } = parameters
  const rootId = `#root`

  const elevation: Parameters.MainElevationTypes =
    main.elevation !== undefined ? main.elevation : 1
  const boxShadow = elevationMap[elevation]

  return (
    <Global
      styles={{
        [`${rootId}`]: {
          '.sidebar-header': {
            display: 'flex',
            alignItems: 'center',
          },
          '& > div > div:last-child > div:first-of-type': {
            boxShadow: boxShadow,
          },
        },
      }}
    />
  )
}
