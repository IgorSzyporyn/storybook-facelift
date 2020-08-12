import AdjustSharpIcon from '@material-ui/icons/AdjustSharp'
import PaletteSharpIcon from '@material-ui/icons/PaletteSharp'
import RadioButtonUncheckedSharpIcon from '@material-ui/icons/RadioButtonUncheckedSharp'
import { IconButton, TooltipLinkList, WithTooltip } from '@storybook/components'
import { styled } from '@storybook/theming'
import memoize from 'memoizerific'
import React, { ReactNode } from 'react'
import { useFaceliftSettings } from '../index'
import { Config } from '../typings'

const CheckedIcon = styled(AdjustSharpIcon)(({ theme }) => ({
  color: theme.color.secondary,
}))

const UncheckedIcon = styled(RadioButtonUncheckedSharpIcon)(({ theme }) => ({
  color: theme.color.secondary,
}))

type ThemeSelectorItem = {
  id: string
  title: string
  onClick: () => void
  value: string
  loading?: boolean
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
  active?: boolean
  disabled?: boolean
  href?: string
}

type ThemeSelectorIconColors = {
  primary: string
  secondary: string
  app: string
  content: string
  border: string
}

const createThemeSelectorItem = memoize(1000)(
  (
    id: string | null,
    title: string,
    key: string,
    currentKey: string,
    change: (key: string) => void
  ): ThemeSelectorItem => ({
    id: id !== null ? id : key,
    title: title,
    // active: currentKey === key,
    disabled: currentKey === key,
    value: key,
    onClick: () => {
      change(key)
    },
    left: currentKey === key ? <CheckedIcon /> : <UncheckedIcon />,
  })
)

const createThemeList = memoize(10)(
  (titles: Config.Titles, currentKey: string, change: (key: string) => void) => {
    const themeSelectorItems: ThemeSelectorItem[] = []

    Object.keys(titles).forEach((key) => {
      const title = titles[key]
      const themeSelectorItem = createThemeSelectorItem(null, title, key, currentKey, change)

      themeSelectorItems.push(themeSelectorItem)
    })

    return themeSelectorItems
  }
)

type ThemeSelectorProps = {
  onChange: (key: string) => void
}

export const ThemeSelector = ({ onChange }: ThemeSelectorProps) => {
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const titles = settings.config.titles
  const hasMultipleThemes = Object.keys(settings.config.themes).length > 1
  const currentTheme = settings.state.themeName

  return currentTheme ? (
    <div hidden={!hasMultipleThemes}>
      <WithTooltip
        placement="top"
        trigger="click"
        closeOnClick
        tooltip={({ onHide }: { onHide: () => void }) => (
          <TooltipLinkList
            links={createThemeList(titles, currentTheme, (key) => {
              onChange(key)
              onHide()
            })}
          />
        )}
      >
        <IconButton title={`Change theme`}>
          <PaletteSharpIcon />
        </IconButton>
      </WithTooltip>
    </div>
  ) : null
}
