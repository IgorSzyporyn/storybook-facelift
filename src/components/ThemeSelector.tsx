import AdjustSharpIcon from '@material-ui/icons/AdjustSharp'
import PaletteSharpIcon from '@material-ui/icons/PaletteSharp'
import RadioButtonUncheckedSharpIcon from '@material-ui/icons/RadioButtonUncheckedSharp'
import { useAddonState } from '@storybook/api'
import { IconButton, TooltipLinkList, WithTooltip } from '@storybook/components'
import { styled } from '@storybook/theming'
import memoize from 'memoizerific'
import React, { ReactNode } from 'react'
import { ADDON_ID, ADDON_THEME_SELECTOR, ADDON_THEME_SELECTOR_ICON } from '../constants'
import { useThemedState } from '../hooks/UseThemedState'
import { Settings, Config } from '../typings'

const CheckedIcon = styled(AdjustSharpIcon)(({ theme }) => ({
  color: theme.color.secondary,
}))

const UncheckedIcon = styled(RadioButtonUncheckedSharpIcon)(({ theme }) => ({
  color: theme.color.secondary,
}))

const TooltipLinkListWrapper = styled.div(({ theme }) => ({
  background: theme.background.app,
  borderRadius: theme.appBorderRadius,
  boxShadow: `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`,

  '& > div': {
    borderRadius: theme.appBorderRadius,

    '& > a': {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',

      '& > span:first-of-type': {
        display: 'flex',
        alignItems: 'center',
        height: '28px',

        '& > svg': {
          height: '19px',
          width: '19px',
        },
      },

      '& > span:last-of-type': {
        lineHeight: '28px',
        height: '28px',
      },
    },
  },
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
  (titles: Config.ConfigTitles, currentKey: string, change: (key: string) => void) => {
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
  const [settings] = useAddonState<Settings.Settings>(ADDON_ID)
  const { themeName: currentKey } = useThemedState()
  let hasMultipleThemes = false
  let titles = {}

  if (settings && settings.config && settings.config.themes && settings.config.titles) {
    titles = settings.config.titles
    hasMultipleThemes = Object.keys(settings.config.themes).length > 1
  }

  console.log(hasMultipleThemes)

  return currentKey ? (
    <div key={ADDON_THEME_SELECTOR} hidden={!hasMultipleThemes}>
      <WithTooltip
        placement="top"
        trigger="click"
        hasChrome={false}
        closeOnClick
        tooltip={({ onHide }: { onHide: () => void }) => (
          <TooltipLinkListWrapper>
            <TooltipLinkList
              links={createThemeList(titles, currentKey, (key) => {
                onChange(key)
                onHide()
              })}
            />
          </TooltipLinkListWrapper>
        )}
      >
        <IconButton key={ADDON_THEME_SELECTOR_ICON} title={`Change theme`}>
          <PaletteSharpIcon />
        </IconButton>
      </WithTooltip>
    </div>
  ) : null
}
