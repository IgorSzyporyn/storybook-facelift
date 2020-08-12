import {  Theme as StorybookTheme } from '@storybook/theming'

export function createInputStyles(theme: StorybookTheme) {
  return {
    boxSizing: 'content-box',
    backgroundColor: theme.input.background,
    color: theme.input.color,
    borderRadius: theme.input.borderRadius,
    padding: '6px 10px',
    boxShadow: `${theme.input.border} 0 0 0 1px inset`,
    transition: 'all 200ms ease-out',

    '&:focus': {
      boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    },
  }
}