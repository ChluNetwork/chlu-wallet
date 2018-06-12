import React from 'react';
// components
import { Grid } from '@material-ui/core'

// custom components
import TextFieldComponent from 'components/Form/TextField';

// redux form
import { Field } from 'redux-form'

// styles
import { withStyles } from '@material-ui/core'

const style = {
  gridRow: {
    margin: '10px 0',
  }
}


class RenderEmailPasswordCombo extends React.Component {
  render() {
    const { emailName, emailLabel, emailHelp,
            passwordName, passwordLabel, passwordHelp, classes } = this.props
    
    return (
      <Grid item xs={12} md={12} >
        <Grid container justify='center'>
          <Grid item xs={12} md={4} className={classes.gridRow}>
            <Field name={emailName}
                   component={TextFieldComponent}
                   label={emailLabel}
                   helperText={emailHelp}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={classes.gridRow}>
            <Field name={passwordName}
                   component={TextFieldComponent}
                   label={passwordLabel}
                   helperText={passwordHelp}
            />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(style)(RenderEmailPasswordCombo)
