import deepmerge from 'ts-deepmerge'
import { Parameters } from '../typings'
import { createPaletteStory } from '../stories/design/palette'

const defaults: AddStoriesConfig = {
  title: 'Theme',
  entries: {
    palette: {
      title: 'Palette',
      path: 'Theme',
      show: true,
    },
    typography: {
      title: 'Palette',
      path: 'Theme',
      show: true,
    },
  },
}

type AddStoriesEntry = {
  path: string
  show: boolean
  title: string
}

type AddStoriesConfig = {
  title: string
  entries: {
    [key in Parameters.StoryEntryTypes]: AddStoriesEntry
  }
}

export function addStories(_config: Parameters.Stories | true) {
  let config = { ...defaults } as AddStoriesConfig

  if (_config !== true) {
    config = deepmerge(defaults, config)

    if (_config.title) {
      if (_config.entries?.palette && !_config.entries?.palette?.path) {
        config.entries.palette.path = _config.title
      }
      if (_config.entries?.typography && !_config.entries?.typography?.path) {
        config.entries.typography.path = _config.title
      }
    }
  }

  if (config.entries) {
    const entries: Parameters.StoryEntries = config.entries

    Object.keys(entries).forEach((key) => {
      const entryType = key as Parameters.StoryEntryTypes
      const entry = entries[entryType]

      if (entry !== false && entry.show) {
        switch (entryType) {
          case 'palette':
            createPaletteStory(entry)
            break
          case 'typography':
            break
          default:
            break
        }
      }
    })
  }
}
