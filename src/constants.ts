export const ADDON_ID = '@badgers/storybook-facelift'
export const ADDON_PARAM_KEY = '@badgers/facelift'
export const ADDON_EVENT_THEME_CHANGE = `${ADDON_ID}/theme-change`
export const ADDON_THEME_SELECTOR_ICON = `${ADDON_ID}-theme-selector-icon`
export const ADDON_THEME_SELECTOR = `${ADDON_ID}-theme-selector-tooltip`
export const ADDON_VARIANT_SELECTOR = `${ADDON_ID}-variant-selector`

export enum AddonEvents {
  PARAMETERS_INITIALIZED = 'parametersInitialized',
  PARAMETERS_UPDATED = 'parametersUpdated',
  STATE_CHANGE_THEME = 'stateChangeTheme',
  STATE_CHANGE_VARIANT = 'stateChangeVariant',
}
