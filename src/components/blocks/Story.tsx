import { Box, BoxProps, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React, { ReactNode } from 'react'
// import { useGlobalStyles } from '../utils/create-global-styles'
import { StoryMarkdown } from './StoryMarkdown'
import { StoryParagraph } from './StoryParagraph'
import { useFaceliftSettings } from '../../hooks/UseFaceliftSettings'
import { Parameters, Config } from 'typings'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: theme.spacing(150),
  },
}))

type StoryProps = {
  children?: ReactNode
  description?: ReactNode
  markdown?: boolean
  subtitle?: string
  title?: string
  render?: (theme: Config.ThemeInstanciatedType, themeType: Parameters.ThemeTypes) => ReactNode
} & BoxProps

export const Story = ({
  children,
  description,
  markdown,
  subtitle,
  title,
  render,
  ...rest
}: StoryProps) => {
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const {
    state: { themeInstanciated: theme, themeType },
  } = settings

  if (!theme || !themeType) {
    return null
  }

  const classes = useStyles()
  const hasHeading = title || subtitle || description

  // useGlobalStyles()

  let Inner = (
    <Box className={classes.root} p={[2, 3, 4]} {...rest} component="div">
      {hasHeading && (
        <Box mt={4} mb={6}>
          {title && (
            <Typography variant="h3" component="h1" gutterBottom>
              <StoryMarkdown source={title} inheritStyles />
            </Typography>
          )}
          {subtitle && (
            <Typography variant="h5" component="h2" gutterBottom>
              <StoryMarkdown source={subtitle} inheritStyles />
            </Typography>
          )}
          {description &&
            (typeof description === 'string' ? (
              <StoryParagraph source={description} />
            ) : (
              description
            ))}
        </Box>
      )}
      <main>{render ? render(theme, themeType) : children}</main>
    </Box>
  )

  if (markdown) {
    Inner = (
      <Box className={classes.root} p={[2, 3, 4]} {...rest} component="div">
        <Paper variant="outlined">
          <Box p={[3, 4, 5]}>{render ? render(theme, themeType) : children}</Box>
        </Paper>
      </Box>
    )
  }

  return Inner
}
