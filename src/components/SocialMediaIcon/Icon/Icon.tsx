import React, { ReactNode } from 'react'
import { SvgIcon, SvgIconProps, useTheme } from '@material-ui/core'
// @PRESENTATION - Using as to get out of a paint-in corner
import { IconProps as ParentIconProps, ExtraIconColorType, IconColorType } from '../SocialMediaIcon'

type ColorPick = Pick<SvgIconProps, 'color'>
type ColorType = ColorPick[keyof ColorPick]

type IconProps = {
  children: ReactNode
} & ParentIconProps

export const Icon = ({ children, ...props }: IconProps) => {
  // We need a instance of the theme
  const theme = useTheme()

  // Extend with our additional context colors in theme
  const coreColors: IconColorType[] = [
    'inherit',
    'primary',
    'secondary',
    'action',
    'error',
    'disabled',
  ]
  const isCoreColor = coreColors.includes(props.context || 'inherit')

  if (isCoreColor) {
    const { context: _color, ...rest } = props
    const color = _color as ColorType
    return (
      <SvgIcon color={color} {...rest}>
        {children}
      </SvgIcon>
    )
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { context: _color, ...rest } = props
    // @PRESENTATION - Using as to get out of a paint-in corner
    const color = theme.palette[_color as ExtraIconColorType].main

    return (
      <SvgIcon {...rest} htmlColor={color}>
        {children}
      </SvgIcon>
    )
  }
}
