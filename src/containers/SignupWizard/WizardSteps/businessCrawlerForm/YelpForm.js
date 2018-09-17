import React from 'react'
import { Grid } from '@material-ui/core'
import CustomInput from 'components/MaterialDashboardPro/CustomInput'
import { InputAdornment, withStyles } from '@material-ui/core'

import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import HttpsIcon from '@material-ui/icons/Https';

const style = {
  gridRow: {
    margin: '12px 0',
  }
}

class YelpForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isProfileUrlValid: false,
      profileUrl: '',
      user: '',
      pass: ''
    }
  }

  handleProfileUrlChange = (e) => {
    this.setState({
      isProfileUrlValid: (e.target.value.length > 0 && this.isYelpProfileUrlValid(e.target.value)),
      profileUrl: e.target.value
    }, this.callChangeHandler)
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
    this.props.onChange(this.state.profileUrl, this.state.user, this.state.pass)
  }

  render() {
    const { classes } = this.props

    return (
      <Grid item xs={12} md={12} >
        <Grid container justify='center'>
          <Grid item xs={12} md={8} className={classes.gridRow}>
            <h5>Import Yelp reviews <small>(coming soon)</small></h5>

            <CustomInput
              success={this.state.isProfileUrlValid}
              error={this.state.profileUrl && !this.state.isProfileUrlValid}
              labelText='Yelp profile URL'
              id='yelp-url'
              name='yelp-url'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                disabled: true,
                value: this.state.profileUrl,
                onChange: this.handleProfileUrlChange,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <FaceIcon className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>

        <Grid container justify='center'>
          {this.renderLogin()}
        </Grid>
      </Grid>
    )
  }

  renderLogin() {
    const { classes } = this.props

    if (this.state.isProfileUrlValid) {
      return (
        <Grid item xs={12} md={8} className={classes.gridRow}>
          <Grid container justify='space-between' spacing={8} style={{ marginTop: -24 }}>
            <Grid item xs={12} md={6} className={classes.gridRow}>
              <CustomInput
                success={this.state.emailState === 'success'}
                error={this.state.emailState === 'error'}
                labelText='Yelp e-mail'
                id='yelp-email'
                name='yelp-email'
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: true,
                  value: this.state.user,
                  onChange: this.handleUserChange,
                  endAdornment: (
                    <InputAdornment position='end' className={classes.inputAdornment}>
                      <EmailIcon className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} className={classes.gridRow}>
              <CustomInput
                success={this.state.emailState === 'success'}
                error={this.state.emailState === 'error'}
                labelText='Yelp password'
                id='yelp-password'
                name='yelp-password'
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  disabled: true,
                  type: 'password',
                  value: this.state.pass,
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
      )
    }
  }

  /**
   * @param {string} url
   */
  isYelpProfileUrlValid(url) {
    if (!url) return false;

    url = url.toLowerCase();

    if (url.indexOf('yelp.com') === 0) return true;
    if (url.indexOf('www.yelp.com') === 0) return true;
    if (url.indexOf('http://yelp.com') === 0) return true;
    if (url.indexOf('https://yelp.com') === 0) return true;
    if (url.indexOf('http://www.yelp.com') === 0) return true;
    if (url.indexOf('https://www.yelp.com') === 0) return true;

    return false;
  }
}

export default withStyles(style)(YelpForm)
