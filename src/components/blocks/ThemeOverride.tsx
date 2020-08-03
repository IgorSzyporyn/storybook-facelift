import { Checkbox, FormControlLabel, FormGroup, Switch } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'sticky',
      top: 0,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: `${theme.typography.pxToRem(theme.spacing(1))} 0`,
      backgroundColor: theme.palette.background.default,
      zIndex: 9999,
      marginLeft: theme.spacing(-1),
      marginRight: theme.spacing(-1),
    },
  })
)

type ThemeOverrideProps = {
  primary: boolean
  secondary: boolean
  onChangePrimary: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeSecondary: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ThemeOverride = ({
  primary,
  secondary,
  onChangePrimary,
  onChangeSecondary,
}: ThemeOverrideProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <FormGroup row>
        <FormControlLabel
          label="Override Automatic Theme"
          control={
            <Checkbox
              color="primary"
              name="enableOverrider"
              checked={primary}
              onChange={onChangePrimary}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
        />
        {primary && (
          <FormControlLabel
            label="Light / Dark"
            control={
              <Switch
                checked={secondary}
                onChange={onChangeSecondary}
                color="primary"
                name="autoThemeOverrider"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
          />
        )}
      </FormGroup>
    </div>
  )
}
