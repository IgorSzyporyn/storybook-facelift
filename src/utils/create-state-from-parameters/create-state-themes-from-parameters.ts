import { themes as nativeThemes, convert } from '@storybook/theming'
import { validateThemeForState } from './validate-theme-for-state'
import { createStateThemeConvertFromParameters } from './create-state-theme-convert-from-parameter'

import type {
  AddonStateTheme,
  AddonStateThemes,
  AddonStateInstanciatedThemes,
  AddonStateStorybookThemeOptions,
} from '../../typings/internal/state'
import type { AddonParameters, ParamTheme } from '../../typings/internal/parameters'

const createNativeTheme = (parameters: AddonParameters) => {
  const nativeTheme: AddonStateTheme = {
    key: 'native',
    type: 'native',
    title: '',
    ...(parameters.native || {}),
    options: {
      light: {
        ...nativeThemes.light,
        ...(parameters.override || {}),
        ...((parameters.native && parameters.native.override) || {}),
      },
      dark: {
        ...nativeThemes.dark,
        ...(parameters.override || {}),
        ...((parameters.native && parameters.native.override) || {}),
      },
    },
    storybook: {
      light: {
        ...nativeThemes.light,
        ...(parameters.override || {}),
        ...((parameters.native && parameters.native.override) || {}),
      },
      dark: {
        ...nativeThemes.dark,
        ...(parameters.override || {}),
        ...((parameters.native && parameters.native.override) || {}),
      },
    },
    instanciated: {
      light: convert(nativeThemes.light),
      dark: convert(nativeThemes.dark),
    },
  }

  // preview.js { parameters: { facelift: { native: { variants: ["dark"]} } } }
  // The config indicates that only dark mode or light is wanted for native
  const { native } = parameters

  if (native && native.variants && native.variants.length > 0) {
    const hasLight = native.variants.includes('light')
    const hasDark = native.variants.includes('dark')

    if (!hasLight) {
      delete nativeTheme.instanciated.light
      delete nativeTheme.storybook.light
      delete nativeTheme.options.light
    }

    if (!hasDark) {
      delete nativeTheme.instanciated.dark
      delete nativeTheme.storybook.dark
      delete nativeTheme.options.dark
    }
  }

  return nativeTheme
}

const enrichTheme = (
  theme: ParamTheme
): Pick<AddonStateTheme, 'provider' | 'providerTheme' | 'converter'> => {
  const { converter: _converter, provider: _provider, providerTheme: _providerTheme } = theme

  let converter = _converter
  let provider = _provider
  let providerTheme = _providerTheme

  // If no provider is supplied BUT the themeType is "mui" or "badgerui" - we override
  // to their chosen theme provider
  if (provider === undefined) {
    switch (theme.type) {
      case 'mui':
        provider = 'mui'
        break
      case 'badgerui':
        provider = 'styled'
        break
      default:
        break
    }
  }

  // If no converter is supplied BUT the themeType is "native", "mui" or "badgerui" - we override
  // to their chosen theme provider
  if (converter === undefined) {
    switch (theme.type) {
      case 'native':
        converter = 'native'
        break
      case 'mui':
        converter = 'mui'
        break
      case 'badgerui':
        converter = 'badgerui'
        break
      default:
        break
    }
  }

  // If no providerTheme is supplied, but a provider is - then use own theme as providerTheme
  if (provider !== undefined && providerTheme === undefined) {
    providerTheme = theme.key
  }

  return { converter, providerTheme, provider }
}

type CreateThemeProps = {
  theme: ParamTheme
  parameters: AddonParameters
}

const createTheme = ({ theme: themeConfig, parameters }: CreateThemeProps) => {
  const { variants, ...paramTheme } = themeConfig

  let theme: AddonStateTheme = {
    ...paramTheme,
    instanciated: { ...variants } as AddonStateInstanciatedThemes,
    storybook: { ...variants } as AddonStateStorybookThemeOptions,
    options: { ...variants },
  }

  const { converter: _converter, provider: _provider, providerTheme: _providerTheme } = themeConfig
  let converter = _converter
  let provider = _provider
  let providerTheme = _providerTheme

  // If no provider is supplied BUT the themeType is "mui" or "badgerui" - we override
  // to their chosen theme provider
  if (provider === undefined) {
    switch (theme.type) {
      case 'mui':
        provider = 'mui'
        break
      case 'badgerui':
        provider = 'styled'
        break
      default:
        break
    }
  }

  // If no converter is supplied BUT the themeType is "native", "mui" or "badgerui" - we override
  // to their chosen theme provider
  if (converter === undefined) {
    switch (theme.type) {
      case 'native':
        converter = 'native'
        break
      case 'mui':
        converter = 'mui'
        break
      case 'badgerui':
        converter = 'badgerui'
        break
      default:
        break
    }
  }

  // If no providerTheme is supplied, but a provider is - then use own theme as providerTheme
  if (provider !== undefined && providerTheme === undefined) {
    providerTheme = theme.key
  }

  if (!converter) {
    return theme
  }

  const themeConverters = parameters.themeConverters || {}
  const themeConverter = themeConverters[converter]

  if (variants.light && themeConfig.variants.light) {
    const light = createStateThemeConvertFromParameters({
      converter: themeConverter,
      parameters,
      themeConfig,
      themeVariant: themeConfig.variants.light,
      themeVariantName: 'light',
    })

    if (light) {
      theme = {
        ...theme,
        instanciated: { ...theme.instanciated, light: light.instanciated },
        storybook: { ...theme.storybook, light: light.storybook },
        options: { ...theme.options, light: light.options },
      }
    }
  }

  if (variants.dark && themeConfig.variants.dark) {
    const dark = createStateThemeConvertFromParameters({
      parameters,
      themeConfig,
      themeVariant: themeConfig.variants.dark,
      converter: themeConverter,
      themeVariantName: 'dark',
    })

    if (dark) {
      theme = {
        ...theme,
        instanciated: { ...theme.instanciated, dark: dark.instanciated },
        storybook: { ...theme.storybook, dark: dark.storybook },
        options: { ...theme.options, dark: dark.options },
      }
    }
  }

  return {
    ...theme,
    converter,
    provider,
    providerTheme,
  }
}

export const createStateThemesFromParameters = (parameters: AddonParameters) => {
  const themes: AddonStateThemes = {}

  themes.native = createNativeTheme(parameters)

  if (parameters.themes) {
    parameters.themes.forEach((theme) => {
      const enrichedThemeValues = enrichTheme(theme)
      const enrichedTheme = { ...theme, ...enrichedThemeValues }
      const validTheme = validateThemeForState(enrichedTheme, parameters)

      if (validTheme) {
        themes[theme.key] = createTheme({ theme: enrichedTheme, parameters })
      }
    })
  }

  return themes
}
