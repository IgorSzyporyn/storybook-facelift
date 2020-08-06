import { getContrastRatio } from '@material-ui/core'
import { convert, Theme, ThemeVars } from '@storybook/theming'
import { Parameters } from '../../typings'
import { bestContrastColor } from '../../utils/best-contrast-color'
import { setColorOpacity } from '../../utils/color'
import { elevationMap } from '../elevation'
import {
  mainRoot,
  menuHeader,
  menuIcon,
  menuItem,
  menuItemExpander,
  menuItemIconSelected,
  menuItemTitle,
  menuItemTitleSelected,
  menuSubitem,
  sidebarForm,
  sidebarHeading,
} from './managerSelectors'

function getHeaderColors(theme: Theme, isDark: boolean) {
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

function getMenuItemColorSelected(theme: Theme) {
  let color = '#ffffff'

  const contrastRatio = getContrastRatio(color, theme.color.secondary)

  if (contrastRatio < 2.62) {
    color = bestContrastColor({
      color1: '#ffffff',
      color2: '#000000',
      background: theme.color.secondary,
      ratio: 4,
    })
  }

  return color
}

function getMenuItemColor(theme: Theme) {
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

function getMainShadow(main: Parameters.Main) {
  const elevation: Parameters.MainElevationTypes = main.elevation !== undefined ? main.elevation : 1
  const shadow = elevationMap[elevation]

  return shadow
}

function getMenuHeaderColor(theme: Theme, isDark: boolean) {
  const color = bestContrastColor({
    color1: isDark ? '#ffffff' : '#000000',
    background: theme.background.app,
    ratio: 4.5,
  })

  return color
}

function getMenuIconColor(_color: string, theme: Theme) {
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

export function createManagerStyles(
  styles: { [key: string]: Record<string, any> },
  themeVars: ThemeVars,
  themeVariant: Parameters.ThemeVariantTypes,
  main: Parameters.Main
) {
  const isDark = themeVariant === 'dark'
  const theme = convert(themeVars)

  const mainShadow = getMainShadow(main)

  const menuHeaderColor = getMenuHeaderColor(theme, isDark)
  const menuIconColor = getMenuIconColor(theme.color.secondary, theme)
  const menuItemColor = getMenuItemColor(theme)
  const menuItemColorSelected = getMenuItemColorSelected(theme)

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
      color: theme.color.primary,
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
    '& > div:nth-of-type(2)': {
      borderLeftColor: headerColors.border,
      borderTopColor: headerColors.border,

      '& #storybook-panel-root': {
        '& > #panel-tab-content > div:last-of-type': {
          backgroundColor: 'transparent',
          overflow: 'hidden',
          borderTopLeftRadius: theme.appBorderRadius,

          '& button': {
            backgroundColor: theme.color.primary,
            color: theme.color.lightest,
            borderRadius: 0,
            fontWeight: 500,
            lineHeight: '26px',
            height: '28px',
            border: '0 none',
            padding: '0 15px',
            minWidth: '95px',
            textAlign: 'center',
            display: 'inline-block',
          },
        },
      },
    },
  }

  return styles
}
