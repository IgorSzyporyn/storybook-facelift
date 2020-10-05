import { Theme as StorybookTheme } from '@storybook/theming'
import { getContrastRatio } from '@material-ui/core'
import { bestContrastColor } from './best-contrast-color'

export function createButtonStyles(theme: StorybookTheme, minimal?: boolean) {
  let foreground = '#ffffff'
  const background = theme.color.secondary

  const contrastRatio = getContrastRatio(foreground, background)

  if (contrastRatio < 2.62) {
    foreground = bestContrastColor({
      color1: foreground,
      background,
      ratio: 7,
    })
  }

  const styles: Record<string, any> = {
    color: foreground,
    background,
    boxShadow: 'none',
    fontWeight: 500,
    textAlign: 'center',
  }

  if (!minimal) {
    styles.lineHeight = '27px'
    styles.height = '28px'
    styles.padding = '0 15px'
    styles.minWidth = '95px'
    styles.display = 'inline-block'
  }

  return styles
}
