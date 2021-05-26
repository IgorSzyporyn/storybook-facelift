import type { Meta as StorybookMeta, Parameters as StorybookParameters } from '@storybook/react'
import type { Args as DefaultArgs } from '@storybook/addons'
import type { AddonParameters } from './parameters'

export type Meta<
  T extends Record<string, unknown> = Record<string, unknown>,
  ArgTypes = DefaultArgs
> = StorybookMeta<ArgTypes> & {
  parameters?: StorybookParameters & {
    facelift: AddonParameters
  } & T
}

export type Parameters<T extends Record<string, unknown> = Record<string, unknown>> = {
  facelift: AddonParameters
} & StorybookParameters &
  T

export type { ThemeVars as StorybookThemeOptions } from '@storybook/theming'

export type { AddonParameters } from './parameters'
