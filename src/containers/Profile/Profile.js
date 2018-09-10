import React, { Component } from 'react'

// components
import { CardHeader, Grid, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core'
import { Avatar, withStyles } from '@material-ui/core'
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'

// icons
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import WebIcon from '@material-ui/icons/Web'
import PlaceIcon from '@material-ui/icons/Place'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import BusinessLocation from './BusinessLocation'
import ReviewCount from './ReviewCount';

const styles = theme => ({
  profileRow: {
    paddingTop: '7%'
  },
  profileContainer: {
    alignItems: 'flex-start'
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
    paddingTop: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  },
  profilePic: {
    pointerEvents: 'none'
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
  },
  contactCard: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2
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
    const { classes, profile, reviewsCount } = this.props;

    if (profile.businessname || profile.location) return undefined;

    return (
      <div className={classes.profileRow}>
        <Grid container justify='center' alignItems='flex-start' spacing={16}>
          <Grid item xs={12} sm={12} md={2} className={classes.profilePic}>
            <PictureUpload />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <div className={classes.fullname}>
              {profile.firstname} {profile.lastname}
            </div>

            <div className={classes.username}>
              @{profile.username} <ReviewCount count={reviewsCount} />
            </div>

            {this.renderContactOptions()}
          </Grid>
        </Grid>
      </div>
    )
  }

  renderBusiness() {
    const { profile, classes, reviewsCount } = this.props

    if (!profile.businessname && !profile.location) return undefined;

    return (
      <div className={classes.profileRow}>
        <Grid container justify='center' alignItems='flex-start' spacing={16}>
          <Grid item xs={12} sm={12} md={2} className={classes.profilePic}>
            <PictureUpload />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <div className={classes.fullname}>
              {profile.businessname}
            </div>

            <div className={classes.username}>
              {profile.businesstype} <ReviewCount count={reviewsCount} />
            </div>

            <div className={classes.description}>
              {profile.businessdescription}
            </div>

            {this.renderContactOptions()}
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

  renderContactOptions() {
    return (
      <div className={this.props.classes.contactCard}>
        <List>
          {this.renderEmail()}
          {this.renderPhone()}
          {this.renderLocation()}
          {this.renderUrl()}
        </List>
      </div>
    )
  }

  renderEmail() {
    const { profile } = this.props

    if (profile.email) {
      return (
        <ListItem>
          <ListItemIcon><EmailIcon /></ListItemIcon>
          <ListItemText primary={profile.email} />
        </ListItem>
      )
    }
  }

  renderPhone() {
    const { profile } = this.props

    if (profile.phone) {
      return (
        <ListItem>
          <ListItemIcon><PhoneIcon /></ListItemIcon>
          <ListItemText primary={profile.phone} />
        </ListItem>
      )
    }
  }

  renderUrl() {
    const { profile } = this.props

    if (profile.website) {
      return (
        <ListItem>
          <ListItemIcon><WebIcon /></ListItemIcon>
          <ListItemText primary={profile.website} />
        </ListItem>
      )
    }
  }

  renderLocation() {
    const { profile } = this.props

    if (profile.businesslocation) {
      return (
        <ListItem>
          <ListItemIcon><PlaceIcon /></ListItemIcon>
          <ListItemText primary={profile.businesslocation} />
        </ListItem>
      )
    }
  }
}

export default withStyles(styles)(Profile)
