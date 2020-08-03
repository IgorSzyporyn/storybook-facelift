import React from 'react'
import { Facebook } from './Icon/Facebook'
import { Twitter } from './Icon/Twitter'
import { Discord } from './Icon/Discord'
import { SvgIconProps } from '@material-ui/core'

export type SocialMediaIconTypes = 'facebook' | 'twitter' | 'discord'

// @PRESENTATION
type CleanSvgIconProps = Omit<SvgIconProps, 'children'>
export type ExtraIconColorType = 'info' | 'success'
type SvgIconColorType = Pick<CleanSvgIconProps, 'color'>
export type IconColorType = ExtraIconColorType | SvgIconColorType[keyof SvgIconColorType]

type IconMap = {
  [key in SocialMediaIconTypes]: React.FunctionComponent<IconProps>
}

const iconMap: IconMap = {
  facebook: Facebook,
  twitter: Twitter,
  discord: Discord,
}

type SocialMediaIconProps = {
  icon?: SocialMediaIconTypes
  context?: IconColorType
} & CleanSvgIconProps

export type IconProps = Omit<SocialMediaIconProps, 'icon'>

const SocialMediaIcon = ({ icon, ...rest }: SocialMediaIconProps) => {
  const iconName = icon || 'facebook'
  const Icon = iconMap[iconName]

  return <Icon shapeRendering="geometricPrecision" {...rest} />
}

export default SocialMediaIcon
