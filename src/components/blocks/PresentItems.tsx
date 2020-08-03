import { Typography, PaperProps, Paper, Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { StoryMarkdown } from './StoryMarkdown'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(6),
      marginTop: theme.spacing(4),
      padding: theme.spacing(4),
    },
  })
)

type PresentItemsProps = {
  captions: string[]
  items: ReactNode[]
} & PaperProps

export const PresentItems = ({ captions, items }: PresentItemsProps) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} variant="outlined">
      <Box display="flex" justifyContent="center">
        {items.map((Item, index) => {
          const key = `presentation-items-${uuidv4()}`

          return (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              key={key}
              mx={2}
              textAlign="center"
            >
              <Box
                alignItems="flex-end"
                className="a11y-inspect"
                display="flex"
                flexGrow={1}
                justifyContent="center"
                mb={1}
              >
                {Item}
              </Box>
              <div>
                <Typography variant="caption" component="h6">
                  <StoryMarkdown source={captions[index]} noMargin inheritStyles />
                </Typography>
              </div>
            </Box>
          )
        })}
      </Box>
    </Paper>
  )
}
