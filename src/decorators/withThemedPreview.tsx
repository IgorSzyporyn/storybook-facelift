import React from 'react'
import { makeDecorator } from '@storybook/addons'
import { WithThemedPreview } from './components/WithThemedPreview'
import { ADDON_PARAM_KEY } from '../constants'

export const withThemedPreview = makeDecorator({
  name: 'withThemedPreview',
  parameterName: ADDON_PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context) => {
    // registerWithThemedPreview()
    return <WithThemedPreview>{storyFn(context)}</WithThemedPreview>
  },
})
