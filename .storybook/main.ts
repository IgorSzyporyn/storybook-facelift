module.exports = {
  stories: ['../src/**/*.stories.@(mdx|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        controls: false,
        backgrounds: false,
      },
    },
    '@storybook/addon-a11y',
    '../dist/register',
  ],
  typescript: {
    check: true,
  },
}
