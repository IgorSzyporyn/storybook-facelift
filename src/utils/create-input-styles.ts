import { Theme as StorybookTheme } from '@storybook/theming'

export function createInputStyles(theme: StorybookTheme) {
  return {
    backgroundColor: theme.input.background,
    color: theme.input.color,
    borderRadius: theme.input.borderRadius,
    boxShadow: `${theme.input.border} 0 0 0 1px inset`,
    transition: 'all 200ms ease-out',

    '&:focus': {
      boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    },
  }
}
