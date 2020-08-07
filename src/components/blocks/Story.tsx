import { Box, BoxProps, makeStyles, Paper, Theme, Typography, useTheme } from '@material-ui/core'
import React, { ReactNode } from 'react'
// import { useGlobalStyles } from '../utils/create-global-styles'
import { StoryMarkdown } from './StoryMarkdown'
import { StoryParagraph } from './StoryParagraph'

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
  themed?: boolean
  title?: string
  render?: (theme: Theme) => ReactNode
} & BoxProps

const InnerComponent = ({
  children,
  description,
  markdown,
  subtitle,
  title,
  render,
  ...rest
}: StoryProps) => {
  const theme = useTheme()
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
      <main>{render ? render(theme) : children}</main>
    </Box>
  )

  if (markdown) {
    Inner = (
      <Box className={classes.root} p={[2, 3, 4]} {...rest} component="div">
        <Paper variant="outlined">
          <Box p={[3, 4, 5]}>{render ? render(theme) : children}</Box>
        </Paper>
      </Box>
    )
  }

  return Inner
}

export const Story = ({ themed, ...rest }: StoryProps) => {
  if (themed) {
    return <InnerComponent {...rest} />
  } else {
    return <InnerComponent {...rest} />
  }
}
