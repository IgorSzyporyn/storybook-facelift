// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import addons from '@storybook/addons'
import { WithFacelift } from './components/WithFacelift'
import { ADDON_EVENT_STATE_CHANGE } from './constants'
import { defaultAddonState } from './defaults'

import type { AddonState } from './typings/internal/state'
import type { DecoratorFn } from '@storybook/react'

export const useFaceliftState = () => {
  const [faceliftState, setFaceliftState] = useState<AddonState>(defaultAddonState)

  useEffect(() => {
    const chan = addons.getChannel()
    chan.on(ADDON_EVENT_STATE_CHANGE, setFaceliftState)
    return () => {
      chan.off(ADDON_EVENT_STATE_CHANGE, setFaceliftState)
    }
  }, [])

  return faceliftState
}

export const withFacelift: DecoratorFn = (storyFn) => {
  return <WithFacelift>{storyFn()}</WithFacelift>
}

export * from './typings/internal/exposed'
