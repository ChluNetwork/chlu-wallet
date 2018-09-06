import React, { Component } from 'react'

// components
import { CardHeader, Grid } from '@material-ui/core'
import { Avatar, withStyles } from '@material-ui/core'
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'

// icons
import ProfileIcon from '@material-ui/icons/AccountCircle'
import BusinessLocation from './BusinessLocation'
import ReviewCount from './ReviewCount';

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
  },
  profileRow: {
    paddingTop: '7%'
  },
  fullname: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 36,
    marginBottom: theme.spacing.unit
  },
  username: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
    paddingTop: theme.spacing.unit
  },
  description: {
    borderTop: `1px solid rgba(0,0,0,0.1)`,
    color: 'rgba(0,0,0,0.6)',
    fontSize: 18,
    fontStyle: 'italic',
    paddingTop: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  map: {
    position: 'relative',
    marginTop: '5%'
  },
  mapShadowOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 999,
    boxShadow: '0 1px 10px rgba(0,0,0,0.3) inset'
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
    const { classes, profile, reviews, hasMoreReviews } = this.props;

    if (profile.businessname || profile.location) return undefined;

    return (
      <div className={classes.profileRow}>
        <Grid container justify='center' alignItems='center' spacing={16}>
          <Grid item xs={12} sm={12} md={2}>
            <PictureUpload />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <div className={classes.fullname}>
              {profile.firstname} {profile.lastname}
            </div>

            <div className={classes.username}>
              @{profile.username} <ReviewCount profile={profile} reviews={reviews} hasMoreReviews={hasMoreReviews} />
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }

  renderBusiness() {
    const { profile, reviews, classes, hasMoreReviews } = this.props

    if (!profile.businessname && !profile.location) return undefined;

    return (
      <div className={classes.profileRow}>
        <Grid container justify='center' alignItems='center' spacing={16}>
          <Grid item xs={12} sm={12} md={2}>
            <PictureUpload />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <div className={classes.fullname}>
              {profile.businessname}
            </div>

            <div className={classes.username}>
              {profile.businesstype} <ReviewCount profile={profile} reviews={reviews} hasMoreReviews={hasMoreReviews} />
            </div>

            <div className={classes.description}>
              {profile.businessdescription}
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.map}>
              <BusinessLocation location={profile.businesslocationgeo} />
              <div className={classes.mapShadowOverlay} />
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Profile)
