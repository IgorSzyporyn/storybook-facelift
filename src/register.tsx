// eslint-disable-next-line no-use-before-define
import React from 'react'
import addons, { types } from '@storybook/addons'
import { Facelift } from './Facelift'
import { ADDON_ID } from './constants'

addons.register(ADDON_ID, (api) => {
  addons.add(ADDON_ID, {
    title: 'Storybook Facelift',
    type: types.TOOL,
    id: 'Facelift',
    render: () => {
      return <Facelift api={api} />
    },
  })
})
