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
    '../dist/register',
  ],
  typescript: {
    check: true,
  },
}
