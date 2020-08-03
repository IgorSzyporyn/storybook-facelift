import { useAddonState } from '@storybook/api'
import { getPreferredColorScheme } from '@storybook/theming/dist/utils'
import merge from 'ts-deepmerge'
import { ADDON_ID } from './constants'
import { Config, Parameters, Settings } from './typings'
import { createStorybookThemeFromMui } from './utils/create-storybook-theme-from-mui'
import { createStorybookThemeOptionsFromMuiOptions } from './utils/create-storybook-theme-from-mui-options'
import { createStorybookThemeFromNative } from './utils/create-storybook-theme-from-native'

export const _defaultParameters: Pick<
  Parameters.Parameters,
  'defaultTheme' | 'includeNative' | 'docs' | 'main' | '_initialized'
> = {
  _initialized: false,
  defaultTheme: 'native',
  includeNative: false,
  docs: 'full',
  main: {
    elevation: 2,
  },
}

export function createParameterDefaults(apiParameters: Partial<Parameters.Parameters>) {
  let defaults = { ..._defaultParameters, ...apiParameters }
  const [settings] = useAddonState<Settings.Settings>(ADDON_ID)

  // This might be parameters from a story - we want to merge the stored state values
  // on top of this (deepmerge) to allow user to extend upon global parameters
  if (settings) {
    const { parameters = {} } = settings
    defaults = merge(defaults, parameters)
  }

  const defaultThemeVariant = defaults.defaultVariant || getPreferredColorScheme()
  const themeConverters = defaults.themeConverters || {}

  themeConverters.mui = createStorybookThemeFromMui
  themeConverters.native = createStorybookThemeFromNative
  themeConverters['mui-options'] = createStorybookThemeOptionsFromMuiOptions

  const parameters: Parameters.Parameters = {
    _initialized: defaults._initialized !== false ? true : false,
    defaultVariant: defaultThemeVariant,
    docs: defaults.docs || 'full',
    themeConverters: themeConverters,
    main:
      defaults.main !== undefined
        ? { ..._defaultParameters.main, ...defaults.main }
        : { ..._defaultParameters.main },
    defaultTheme: defaults.defaultTheme !== undefined ? defaults.defaultTheme : 'native',
    native: defaults.native !== undefined ? defaults.native : false,
    includeNative: defaults.includeNative !== undefined ? defaults.includeNative : false,
    stories: defaults.stories !== undefined ? defaults.stories : true,
    themes: defaults.themes !== undefined ? defaults.themes : false,
    override: defaults.override !== undefined ? defaults.override : false,
  }

  return parameters
}

export function updateParameters(
  newParams: Partial<Parameters.Parameters> = {},
  initialParams: Parameters.Parameters
) {
  const parameters: Parameters.Parameters = {
    ...initialParams,
    ...newParams,
    themeConverters: {
      ...initialParams.themeConverters,
      ...(newParams.themeConverters || {}),
    },
  }

  return parameters
}

const getFirstThemeKey = (themes: Config.Themes) => Object.keys(themes).map((k) => k)[0]

export function verifyParameters(
  parametersSource: Parameters.Parameters,
  configSource: Config.Config
) {
  const parameters = { ...parametersSource }
  const config = { ...configSource }

  const { defaultTheme, defaultVariant, includeNative: includeNativeTheme } = parameters
  const { themes } = config

  const themeMatches = themes[defaultTheme] !== undefined

  // Theme did not match - probably due to missing defaultTheme and no native theme
  if (!themeMatches) {
    // Just pick the first one in line as the new default theme
    const newDefaultTheme = getFirstThemeKey(themes)
    parameters.defaultTheme = newDefaultTheme

    // Check if variant matches, if not set to the opposite as there are only
    // the two options and theme has to contain one of them
    const variantMatches = themes[newDefaultTheme][defaultVariant] !== undefined

    if (!variantMatches) {
      parameters.defaultVariant = defaultVariant === 'dark' ? 'light' : 'dark'
    }
  } else {
    // Theme did match - check if native is present and allowed
    const includeNative = includeNativeTheme === true
    const defaultIsNative = defaultTheme === 'native'
    const nativeIsPresent = themes.native !== undefined
    const hasAdditionalThemes = Object.keys(themes).length > (nativeIsPresent ? 1 : 0)
    let newDefaultTheme = defaultTheme

    // Default is native, but not allowed (native will be cleared out if still present)
    // However we can not make a change if it is the only theme present
    if (defaultIsNative && !includeNative) {
      if (nativeIsPresent && hasAdditionalThemes) {
        const themesClone = { ...themes }
        delete themesClone.native

        newDefaultTheme = getFirstThemeKey(themesClone)
      } else if (!nativeIsPresent) {
        newDefaultTheme = getFirstThemeKey(themes)
      }
    }

    parameters.defaultTheme = newDefaultTheme

    const variantMatches = themes[newDefaultTheme][defaultVariant] !== undefined

    if (!variantMatches) {
      parameters.defaultVariant = defaultVariant === 'dark' ? 'light' : 'dark'
    }
  }

  return parameters
}
