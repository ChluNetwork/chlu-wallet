import React from 'react'
import { Grid } from '@material-ui/core'
import CustomInput from 'components/MaterialDashboardPro/CustomInput'
import { InputAdornment, Paper, withStyles } from '@material-ui/core'

import FaceIcon from '@material-ui/icons/Face';
import HttpsIcon from '@material-ui/icons/Https';

const style = {
  gridRow: {
    margin: '12px 0',
  }
}

class LinkedinForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  handleUserChange = (e) => {
    this.setState({
      user: e.target.value
    }, this.callChangeHandler)
  }

  handlePasswordChange = (e) => {
    this.setState({
      pass: e.target.value
    }, this.callChangeHandler)
  }

  callChangeHandler = () => {
    this.props.onChange(this.state.user, this.state.pass)
  }

  render() {
    const { classes } = this.props

    return (
      <Grid item xs={12} md={12} >
        <Grid container justify='center'>
          <Grid item xs={12} md={8} className={classes.gridRow}>
            <h5>Import LinkedIn reviews</h5>

            <Grid container justify='space-between' spacing={8} style={{ marginTop: -24 }}>
              <Grid item xs={12} sm={12} md={6} className={classes.gridRow}>
                <CustomInput
                  labelText='LinkedIn login'
                  id='linkedin-email'
                  name='linkedin-email'
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    value: this.state.user,
                    onChange: this.handleUserChange,
                    endAdornment: (
                      <InputAdornment position='end' className={classes.inputAdornment}>
                        <FaceIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.gridRow}>
                <CustomInput
                  labelText='LinkedIn password'
                  id='linkedin-password'
                  name='linkedin-password'
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    type: 'password',
                    value: this.state.password,
                    onChange: this.handlePasswordChange,
                    endAdornment: (
                      <InputAdornment position='end' className={classes.inputAdornment}>
                        <HttpsIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(style)(LinkedinForm)
