import type { AddonStateThemes } from '../typings/internal/state'
import type { AddonParameters } from '../typings/internal/parameters'
import type { ThemeProviderType } from '../typings/internal/common'

type GetDefaultActiveProviderValuesProps = {
  parameters: AddonParameters
  themes: AddonStateThemes
}

type DefaultActiveProviderValues = {
  providerKey?: ThemeProviderType
  providerThemeKey?: string
}

export const getDefaultActiveProviderValues = ({
  parameters,
}: GetDefaultActiveProviderValuesProps) => {
  const { provider, providerTheme } = parameters
  const providerValues: DefaultActiveProviderValues = {
    providerKey: provider,
    providerThemeKey: providerTheme,
  }

  return providerValues
}
