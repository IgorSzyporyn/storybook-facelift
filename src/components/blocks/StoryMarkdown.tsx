import { createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useThemedState } from '../../hooks/UseThemedState'

const useStyles = makeStyles((theme) =>
  createStyles<'root', StoryMarkdownProps & { darkMode: boolean }>({
    root: {
      '& p': {
        margin: ({ noMargin, inheritStyles }) =>
          noMargin || inheritStyles ? 0 : theme.typography.body1.margin,
        lineHeight: ({ inheritStyles }) =>
          inheritStyles ? 'inherit' : theme.typography.body1.lineHeight,
        fontSize: ({ inheritStyles }) =>
          inheritStyles ? 'inherit' : theme.typography.body1.fontSize,
        fontWeight: ({ inheritStyles }) =>
          inheritStyles ? 'inherit' : theme.typography.body1.fontWeight,
      },

      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',

        '&:hover': {
          textDecoration: 'underline',
        },
      },

      '& code': {
        fontSize: `${theme.typography.body2.fontSize}`,
      },

      '& pre': {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4),
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: theme.shape.borderRadius,
      },
    },
  })
)

// @PRESENTATION
type StoryMarkdownProps = {
  noMargin?: boolean
  inheritStyles?: boolean
} & ReactMarkdown.ReactMarkdownProps

export const StoryMarkdown = ({ noMargin, inheritStyles, ...rest }: StoryMarkdownProps) => {
  const storybookTheme = useThemedState()
  const darkMode = storybookTheme.themeVariant === 'dark'
  const classes = useStyles({ noMargin, inheritStyles, darkMode })

  return <ReactMarkdown className={classes.root} {...rest} />
}
