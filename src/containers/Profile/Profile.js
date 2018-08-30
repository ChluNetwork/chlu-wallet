import React, { Component } from 'react'

// components
import { CardHeader, Grid, InputAdornment } from '@material-ui/core'
import { Avatar, withStyles } from '@material-ui/core'
import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'
// icons
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
import ProfileIcon from '@material-ui/icons/AccountCircle'
import BusinessLocation from './BusinessLocation'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  card: {
    margin: '30px'
  }
});

class Profile extends Component {

  render () {
    const { loading } = this.props

    return(
      <div>
        { loading && <CardHeader
          avatar={<Avatar><ProfileIcon/></Avatar>}
          title='Profile'
          subheader='Loading...'
        /> }
        {!loading && this.renderUser()}
        {!loading && this.renderBusiness()}
      </div>
    )
  }

  renderUser() {
    const { classes, profile } = this.props;

    if (profile.businessname || profile.location) return undefined;

    return (
      <div>
        <Grid container justify='center' spacing={16}>
          <Grid item xs={12} sm={12} md={12}>
            <PictureUpload />
            <div className={classes.description}>Upload Photo</div>
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              labelText='Email'
              id='email'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.email || "",
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              labelText='User Name'
              id='username'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.username || "",
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              labelText='First Name'
              id='firstname'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.firstname || "",
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              labelText='Last Name'
              id='lastname'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.lastname || "",
                disabled: true,
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </div>
    )
  }

  renderBusiness() {
    const { profile } = this.props

    if (!profile.businessname && !profile.location) return undefined;

    return (
      <div>
        <Grid container justify='center' spacing={16}>
          <Grid item xs={12} sm={12} md={12}>
            <PictureUpload />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              labelText='Name'
              id='businessname'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.businessname || "",
                disabled: true
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <CustomInput
              labelText='Business Type'
              id='description'
              formControlProps={{ fullWidth: true }}
              inputProps={{
                value: profile.businesstype || "",
                disabled: true
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <BusinessLocation location={profile.businesslocationgeo} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Profile)
