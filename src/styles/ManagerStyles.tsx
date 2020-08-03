import { Global } from '@storybook/theming'
import React from 'react'
import { Parameters } from '../typings'
import { useFaceliftSettings } from '../hooks/UseFaceliftSettings'

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
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const { parameters } = settings

  const rootId = `#root`
  let boxShadow = 'none'

  if (parameters) {
    const { main } = parameters
    const elevation: Parameters.MainElevationTypes =
      main.elevation !== undefined ? main.elevation : 1
    boxShadow = elevationMap[elevation]
  }

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
