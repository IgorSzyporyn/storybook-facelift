import '@storybook/react'

import type { AddonParameters } from './internal/parameters'

declare module '@storybook/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Parameters extends { facelift: AddonParameters } {}
}
