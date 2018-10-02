import React from 'react'
import { Grid } from '@material-ui/core'
import { Field } from 'redux-form'
import CustomInput from 'components/Form/CustomInput'
import { InputAdornment, withStyles } from '@material-ui/core'

import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import HttpsIcon from '@material-ui/icons/Https';

const style = {
  gridRow: {
    margin: '12px 0',
  }
}

class UpWorkForm extends React.Component {

  render() {
    const { classes } = this.props

    return (
      <Grid item xs={12} md={12} >
        <Grid container justify='center'>
          <Grid item xs={12} md={8} className={classes.gridRow}>
            <h5>Import UpWork reviews</h5>

            <Field
              component={CustomInput}
              labelText={<span>UpWork profile URL</span>}
              name='upwork-url'
              formControlProps={{ fullWidth: true }}
              inputProps={{
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

    return (
      <Grid item xs={12} md={8} className={classes.gridRow}>
        <Grid container justify='space-between' spacing={8} style={{ marginTop: -24 }}>
          <Grid item xs={12} sm={12} md={6} className={classes.gridRow}>
            <Field
              component={CustomInput}
              labelText={<span>UpWork e-mail <small>(optional)</small></span>}
              name='upwork-user'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <EmailIcon className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.gridRow}>
            <Field
              component={CustomInput}
              labelText={<span>UpWork password <small>(optional)</small></span>}
              id='upwork-password'
              name='upwork-password'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                type: 'password',
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

  /**
   * @param {string} url
   */
  isUpWorkProfileUrlValid(url) {
    if (!url) return false;

    url = url.toLowerCase();

    if (url.indexOf("upwork.com") === 0) return true;
    if (url.indexOf("www.upwork.com") === 0) return true;
    if (url.indexOf("http://upwork.com") === 0) return true;
    if (url.indexOf("https://upwork.com") === 0) return true;
    if (url.indexOf("http://www.upwork.com") === 0) return true;
    if (url.indexOf("https://www.upwork.com") === 0) return true;

    return false;
  }
}

export default withStyles(style)(UpWorkForm)
