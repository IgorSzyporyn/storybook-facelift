/* eslint-disable no-param-reassign */
import { getContrastRatio } from '@material-ui/core'
import {
  convert,
  Theme as StorybookTheme,
  ThemeVars as StorybookThemeOptions,
} from '@storybook/theming'
import { bestContrastColor } from '../../utils/best-contrast-color'
import { setColorOpacity } from '../../utils/color'
import { elevationMap } from '../elevation'
// import { createButtonStyles } from '../../utils/create-button-styles'
// import { createDocsTableStyles } from '../../utils/create-docs-table-styles'

import type { ThemeVariantType } from '../../typings/internal/common'
import type { ParamUi, ParamUiElevationTypes } from '../../typings/internal/parameters'

export const rootId = `#root`

export const mainRoot = `${rootId} > div > div[role=main] > div`

export const sidebarHeading = `${rootId} .sidebar-header`
export const sidebarForm = `${sidebarHeading} + form`
export const sidebarMenu = `${sidebarForm} + div`

export const menuHeader = `${sidebarMenu} .sidebar-subheading`
export const menuItem = `${sidebarMenu} .sidebar-item`
export const menuItemSelected = `${sidebarMenu} .sidebar-item.selected`

export const menuItemExpander = `${menuItem} .sidebar-expander`
export const menuIcon = `${menuItem} .sidebar-svg-icon`
export const menuItemIcon = `${menuItem} .sidebar-expander + .sidebar-svg-icon`
export const menuItemTitle = `${menuItem} .sidebar-expander + .sidebar-svg-icon + span`
export const menuSubitem = `${sidebarMenu} > div > section > div > .sidebar-item`

export const menuItemIconSelected = `${menuItemSelected} .sidebar-svg-icon`
export const menuItemTitleSelected = `${menuItemSelected} .sidebar-svg-icon + span`

export const modalMenu = `body > div:last-child`

function getHeaderColors(theme: StorybookTheme, isDark: boolean) {
  let baseColor = theme.color.defaultText

  const contrastRatio = getContrastRatio(baseColor, theme.background.app)

  if (contrastRatio < 3) {
    baseColor = bestContrastColor({
      color1: theme.color.defaultText,
      background: theme.background.app,
      ratio: 3.5,
    })
  }

  const actionColor = setColorOpacity(baseColor, isDark ? 0.4 : 0.35)
  const actionColorHover = setColorOpacity(baseColor, 0.7)

  const borderColor = setColorOpacity(baseColor, isDark ? 0.1 : 0.1)

  return {
    title: baseColor,
    action: actionColor,
    actionActive: actionColorHover,
    border: borderColor,
  }
}

function getMenuItemColorSelected(theme: StorybookTheme) {
  let color = '#ffffff'

  const contrastRatio = getContrastRatio(color, theme.color.secondary)

  if (contrastRatio < 2.62) {
    color = bestContrastColor({
      color1: '#ffffff',
      color2: '#000000',
      background: theme.color.secondary,
      ratio: 7,
    })
  }

  return color
}

function getMenuSubitemIconColor(theme: StorybookTheme) {
  let color = theme.color.primary

  const contrastRatio = getContrastRatio(color, theme.background.app)

  if (contrastRatio < 2.62) {
    color = bestContrastColor({
      color1: theme.color.primary,
      background: theme.background.app,
      ratio: 4,
    })
  }

  return color
}

function getMenuItemColor(theme: StorybookTheme) {
  let color = theme.color.defaultText

  const contrastRatio = getContrastRatio(color, theme.background.app)

  if (contrastRatio < 3) {
    color = bestContrastColor({
      color1: theme.color.defaultText,
      background: theme.background.app,
      ratio: 3.5,
    })
  }

  return color
}

function getMainShadow(ui: ParamUi) {
  const elevation: ParamUiElevationTypes = ui.elevation !== undefined ? ui.elevation : 1
  const shadow = elevationMap[elevation]

  return shadow
}

function getMenuHeaderColor(theme: StorybookTheme, isDark: boolean) {
  const color = bestContrastColor({
    color1: isDark ? '#ffffff' : '#000000',
    background: theme.background.app,
    ratio: 4.5,
  })

  return color
}

function getMenuIconColor(_color: string, theme: StorybookTheme) {
  let color = _color
  const contrastRatio = getContrastRatio(color, theme.background.app)

  if (contrastRatio < 3) {
    color = bestContrastColor({
      color1: theme.color.secondary,
      background: theme.background.app,
      ratio: 3,
    })
  }

  return color
}

type EnhanceManagerStylesProps = {
  styles: { [key: string]: Record<string, any> }
  themeVars?: StorybookThemeOptions
  themeVariant?: ThemeVariantType
  uiParams?: ParamUi
}

export function enhanceManagerStyles({
  styles,
  themeVars,
  themeVariant = 'light',
  uiParams = {},
}: EnhanceManagerStylesProps) {
  const isDark = themeVariant === 'dark'
  const theme = convert(themeVars)

  const mainShadow = getMainShadow(uiParams)

  const menuHeaderColor = getMenuHeaderColor(theme, isDark)
  const menuIconColor = getMenuIconColor(theme.color.secondary, theme)
  const menuItemColor = getMenuItemColor(theme)
  const menuItemColorSelected = getMenuItemColorSelected(theme)
  const menuSubitemIconColor = getMenuSubitemIconColor(theme)

  const headerColors = getHeaderColors(theme, isDark)

  styles[`${sidebarHeading}`] = {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      color: headerColors.title,
    },
    '& button': {
      boxShadow: `${headerColors.action} 0 0 0 1px inset`,

      [`& svg path`]: {
        fill: headerColors.actionActive,
      },

      [`&:hover`]: {
        boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,

        [`& svg path`]: {
          fill: theme.color.secondary,
        },
      },
    },
  }

  styles[`${sidebarForm}`] = {
    marginTop: '',
    borderBottom: '0 none',

    [`& input[type="text"]`]: {
      borderBottom: `1px solid ${headerColors.action}`,
      padding: '4px 20px 4px 24px',

      // Most browsers support this now
      [`&::placeholder`]: {
        color: headerColors.action,
      },

      // WebKit, Blink (Safari, Google Chrome, Opera 15+) and Microsoft Edge
      [`&::-webkit-input-placeholder`]: {
        color: headerColors.action,
      },

      // Mozilla Firefox 4 to 18
      [`&:-moz-placeholder`]: {
        color: headerColors.action,
      },

      // Mozilla Firefox 19+
      [`&::-moz-placeholder`]: {
        color: headerColors.action,
      },

      // Internet Explorer 10 and 11
      [`&:-ms-input-placeholder`]: {
        color: headerColors.action,
      },

      [`& + svg`]: {
        color: headerColors.action,
        marginTop: '-1px',

        [`& path`]: {
          opacity: 1,
        },
      },

      [`& + svg + button`]: {
        marginTop: '-1px',
      },

      [`&:active`]: {
        borderBottom: `1px solid ${headerColors.actionActive}`,

        [`& + svg`]: {
          color: headerColors.actionActive,
        },
      },

      [`&:focus`]: {
        borderBottom: `1px solid ${headerColors.actionActive}`,

        [`& + svg`]: {
          color: headerColors.actionActive,
        },
      },
    },
  }

  styles[`${menuHeader}`] = {
    color: menuHeaderColor,
    fontWeight: 900,
    opacity: 0.6,
  }

  styles[`${menuItem}`] = {
    transition: 'background color 100ms ease-in-out',
    height: '30px',
  }

  styles[`${menuItemExpander}`] = {
    top: '12px',
  }

  styles[`${menuIcon}`] = {
    color: menuIconColor,
    marginTop: '-1px',
    height: '11px',
    width: 'auto',
  }

  styles[`${menuItemTitle}`] = {
    fontWeight: 400,
    color: menuItemColor,
  }

  styles[`${menuSubitem}`] = {
    '& .sidebar-svg-icon': {
      color: menuSubitemIconColor,
    },
  }

  styles[`${menuItemIconSelected}`] = {
    color: menuItemColorSelected,
  }

  styles[`${menuItemTitleSelected}`] = {
    color: menuItemColorSelected,
    fontWeight: theme.typography.weight.bold,
  }

  styles[`${mainRoot}`] = {
    boxShadow: mainShadow,
    backgroundColor: theme.background.content,

    // Addon panel
    /*
    '& > div:nth-of-type(2)': {
      borderLeftColor: headerColors.border,
      borderTopColor: headerColors.border,

      '& #storybook-panel-root': {
        '& > #panel-tab-content > div:last-of-type': {
          backgroundColor: theme.background.content,
          borderTopLeftRadius: theme.appBorderRadius,

          '& .docblock-argstable': {
            ...docsTableStyles,
          },

          '& > button': {
            ...buttonStyles,
            borderRadius: 0,

            '&:first-of-type': {
              borderTopLeftRadius: theme.appBorderRadius,
            },

            '&:not(:last-of-type)': {
              borderRight: `1px solid ${setColorOpacity(headerColors.border, 0.25)}`,
              marginRight: '1px',
            },
          },
        },
      },
    },
    */
  }

  styles[`${modalMenu}`] = {
    background: theme.background.app,
    borderRadius: theme.appBorderRadius,
    boxShadow: `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`,

    '& > div:first-of-type': {
      display: 'none',
    },

    '& > div:last-of-type': {
      borderRadius: theme.appBorderRadius,
      maxHeight: '628px',

      '& > a': {
        display: 'flex',
        alignItems: 'center',
        padding: '7px 14px',
        lineHeight: '20px',

        '& > span': {
          display: 'flex',
          alignItems: 'center',
          margin: '0 4px',

          '& > svg': {
            height: '16px',
            width: '16px',
          },
        },

        '& > span:first-of-type': {
          marginLeft: 0,
        },

        '& > span:last-of-type': {
          marginRight: 0,
        },
      },
    },
  }

  return styles
}
