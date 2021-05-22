// eslint-disable-next-line no-use-before-define
import React, { ReactNode } from 'react'
import AdjustSharpIcon from '@material-ui/icons/AdjustSharp'
import PaletteSharpIcon from '@material-ui/icons/PaletteSharp'
import RadioButtonUncheckedSharpIcon from '@material-ui/icons/RadioButtonUncheckedSharp'
import { IconButton, TooltipLinkList, WithTooltip } from '@storybook/components'
import { styled } from '@storybook/theming'
import memoize from 'memoizerific'
import { useFaceliftSettings } from '../index'

import type { ConfigTitles } from '../typings/internal/config'

const CheckedIcon = styled(AdjustSharpIcon)(({ theme }) => ({
  color: theme.color.secondary,
  height: '19px !important',
}))

const UncheckedIcon = styled(RadioButtonUncheckedSharpIcon)(({ theme }) => ({
  color: theme.color.secondary,
  height: '19px !important',
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

const createThemeSelectorItem = memoize(1000)(
  (
    id: string | null,
    title: string,
    key: string,
    currentKey: string,
    change: (_key: string) => void
  ): ThemeSelectorItem => ({
    id: id !== null ? id : key,
    title,
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
  (titles: ConfigTitles, currentKey: string, change: (key: string) => void) => {
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

  const { titles } = settings.config
  const hasMultipleThemes = Object.keys(settings.config.themes).length > 1
  const currentTheme = settings.state.themeName

  return currentTheme ? (
    <div hidden={!hasMultipleThemes}>
      <WithTooltip
        placement="top"
        trigger="click"
        closeOnClick
        // eslint-disable-next-line react/no-unused-prop-types
        tooltip={({ onHide }: { onHide: () => void }) => (
          <TooltipLinkList
            links={createThemeList(titles, currentTheme, (key) => {
              onChange(key)
              onHide()
            })}
          />
        )}
      >
        <IconButton title="Change theme">
          <PaletteSharpIcon />
        </IconButton>
      </WithTooltip>
    </div>
  ) : null
}
