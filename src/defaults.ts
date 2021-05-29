import { createStorybookThemeOptionsFromMui } from './utils/converters/create-storybook-theme-from-mui'
import { createStorybookThemeFromNative } from './utils/converters/create-storybook-theme-from-native'
import { createStorybookThemeFromBadgerUi } from './utils/converters/create-storybook-theme-from-badgerui'

import type { AddonState } from './typings/internal/state'
import type { AddonParameters } from './typings/internal/parameters'

export const defaultParameters: AddonParameters = {
  themeConverters: {
    mui: createStorybookThemeOptionsFromMui,
    native: createStorybookThemeFromNative,
    badgerui: createStorybookThemeFromBadgerUi,
    styled: createStorybookThemeFromBadgerUi,
  },
}

export const defaultAddonState: AddonState = {
  initialized: false,
  converters: {},
  themes: {},
  themeTitles: {},
  parameters: { ...defaultParameters },
}
