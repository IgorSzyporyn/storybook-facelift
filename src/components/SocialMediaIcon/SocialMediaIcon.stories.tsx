import React from 'react'
import SocialMediaIcon from './SocialMediaIcon'
import { withKnobs, select } from '@storybook/addon-knobs'

export default {
  title: 'Components/SocialMediaIcon',
  component: SocialMediaIcon,
  decorators: [withKnobs],
  parameters: {
    options: {
      showPanel: true,
      selectedPanel: 'storybook/knobs/panel',
    },
    '@badgers/storybook-facelift': {
      enhanceUi: true,
    },
  },
  includeStories: ['Default'],
}

export const Default = () => {
  // Create knob selector for icon prop
  const icon = select(
    'Choose Icon',
    {
      Facebook: 'facebook',
      Twitter: 'twitter',
      Discord: 'discord',
    },
    'facebook',
    'icon'
  )

  // Create knob selector for fontSize prop
  const fontSize = select(
    'Choose FontSize',
    {
      Default: undefined,
      Inherit: 'inherit',
      Small: 'small',
      Large: 'large',
    },
    'large',
    'font size'
  )

  return (
    <>
      <div style={{ display: 'flex' }}>
        <SocialMediaIcon key="smi-icon-facebook" fontSize={fontSize} icon="facebook" />
        <SocialMediaIcon key="smi-icon-twitter" fontSize={fontSize} icon="twitter" />
        <SocialMediaIcon key="smi-icon-discord" fontSize={fontSize} icon="discord" />
      </div>
      <div style={{ display: 'flex' }}>
        <SocialMediaIcon
          key="smi-context-primary"
          fontSize={fontSize}
          icon={icon}
          context="primary"
        />
        <SocialMediaIcon
          key="smi-context-secondary"
          fontSize={fontSize}
          icon={icon}
          context="secondary"
        />
        <SocialMediaIcon key="smi-context-info" fontSize={fontSize} icon={icon} context="info" />
        <SocialMediaIcon
          key="smi-context-success"
          fontSize={fontSize}
          icon={icon}
          context="success"
        />
      </div>
      <div style={{ display: 'flex' }}>
        <SocialMediaIcon
          key="smi-context-action"
          fontSize={fontSize}
          icon={icon}
          context="action"
        />
        <SocialMediaIcon key="smi-context-error" fontSize={fontSize} icon={icon} context="error" />
        <SocialMediaIcon
          key="smi-context-disabled"
          fontSize={fontSize}
          icon={icon}
          context="disabled"
        />
      </div>
    </>
  )
}
