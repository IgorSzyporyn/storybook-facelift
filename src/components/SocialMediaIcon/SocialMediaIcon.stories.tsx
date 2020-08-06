import React from 'react'
import SocialMediaIcon from './SocialMediaIcon'

export default {
  title: 'Components/SocialMediaIcon',
  component: SocialMediaIcon,
  decorators: [],
  parameters: {
    '@badgers/facelift': {
      enhanceUi: true,
      docs: {
        hidePropertyBorders: true,
        type: 'full',
      },
    },
  },
  includeStories: ['Default'],
}

export const Default = () => {
  return (
    <div>
      <SocialMediaIcon key="smi-icon-facebook" fontSize="large" icon="facebook" context="primary" />
      <SocialMediaIcon key="smi-icon-twitter" fontSize="inherit" icon="twitter" />
      <SocialMediaIcon key="smi-icon-discord" fontSize="small" icon="discord" />
    </div>
  )
}
