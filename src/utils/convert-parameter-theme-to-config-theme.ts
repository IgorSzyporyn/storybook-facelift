import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import { Parameters } from '../typings'

export type ConvertParameterThemeToConfigThemeProps = {
  parameters: Parameters.AddonParameters
  themeConfig: Parameters.Theme
  themeVariant: Parameters.ThemeVariant
  converter: Parameters.ThemeConverter
  themeVariantName: Parameters.ThemeVariantTypes
}

export function convertParameterThemeToConfigTheme({
  parameters,
  themeConfig,
  themeVariant,
  converter,
  themeVariantName: variant,
}: ConvertParameterThemeToConfigThemeProps) {
  if (themeVariant === undefined) {
    return null
  }

  const theme = themeVariant
  const variantOverride: {} = {
    ...(parameters.override || {}),
    ...(themeConfig.override || {}),
  }

  const _override = Object.keys(variantOverride).length === 0 ? undefined : variantOverride
  const override = _override as StorybookThemeOptions | undefined

  const converted = converter({
    theme,
    override,
    variant,
    background: themeConfig.background,
  })

  return converted
}
