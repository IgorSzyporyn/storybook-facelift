import type { Meta, Parameters } from '@storybook/react'
import type { Args as DefaultArgs } from '@storybook/addons'
import type { AddonParameters } from './parameters'

export type FaceliftMeta<
  T extends Record<string, unknown> = Record<string, unknown>,
  ArgTypes = DefaultArgs
> = Meta<ArgTypes> & {
  parameters?: Parameters & {
    facelift: AddonParameters
  } & T
}

export type FaceliftParameters<T extends Record<string, unknown> = Record<string, unknown>> = {
  facelift: AddonParameters
} & Parameters &
  T

export type { ThemeVars as StorybookThemeOptions } from '@storybook/theming'

export type { AddonParameters } from './parameters'
