import { makeDecorator } from '@storybook/addons'
import React from 'react'
import { ADDON_PARAM_KEY } from '../constants'
import { WithFaceliftPreview } from './components/WithFaceliftPreview'

export const withFaceliftPreview = makeDecorator({
  name: 'withFaceliftPreview',
  parameterName: ADDON_PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context) => {
    return <WithFaceliftPreview>{storyFn(context)}</WithFaceliftPreview>
  },
})
