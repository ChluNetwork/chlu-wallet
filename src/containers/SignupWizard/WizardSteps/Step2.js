import React from 'react';

// components
import { Grid, InputAdornment, CircularProgress } from '@material-ui/core'

// custom components
import RegularCard from 'components/MaterialDashboardPro/RegularCard'
import NavPills from 'components/MaterialDashboardPro/NavPills'
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'
import CustomInput from 'components/MaterialDashboardPro/CustomInput'
import Button from 'components/MaterialDashboardPro/Button'
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
import ImportReviews from 'containers/ImportReviews'

// icons
import Person from '@material-ui/icons/Person';
import AccountBox from '@material-ui/icons/AccountBox';
import Web from '@material-ui/icons/Web';
import StarHalf from '@material-ui/icons/StarHalf';
import Business from '@material-ui/icons/Business';
import Face from '@material-ui/icons/Face'
import DoneIcon from '@material-ui/icons/Done'

// styles
import { withStyles } from '@material-ui/core'
import regularFormsStyle from 'styles/material-dashboard-pro-react/views/regularFormsStyle';

const style = {
  profileText: {
    fontWeight: '300',
    margin: '10px 0 0 0',
    textAlign: 'center'
  },
  itemGrid: {
    backgroundColor: 'rgba(200, 200, 200, .2)'
  },
  card: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    margin: '1px 0',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: '6px',
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff'
  },
  ...regularFormsStyle
};

class Step3 extends React.Component {

  render() {
    const {
      wallet,
      isBusiness,
      profileLoading,
      downloadWallet,
      loginLoading,
      creatingWallet
    } = this.props;

    if (loginLoading) {
      return (
        <Grid container justify='center'>
          <Grid item xs={4}>
            <InfoArea
              icon={CircularProgress}
              iconColor='warning'
              title='Setting Up'
              description='Please wait while we finish setting up your Wallet'
            />
          </Grid>
        </Grid>
      )
    } else if (profileLoading) {
      return (
        <Grid container justify='center'>
          <Grid item xs={4}>
            <InfoArea
              icon={CircularProgress}
              iconColor='warning'
              title='Fetching Profile'
              description='Please wait while we get your profile data'
            />
          </Grid>
        </Grid>
      )
    } else if (!isBusiness && wallet && wallet.did) {
      return (
        <Grid container justify='center'>
          <Grid item xs={4}>
            <InfoArea
              icon={DoneIcon}
              iconColor='success'
              title='All done'
              description='You have saved your Keys'
            >
              <Button color='success' onClick={() => downloadWallet(true)}>
                Download again
              </Button>
            </InfoArea>
          </Grid>
          </Grid>
      )
    } else if (creatingWallet) {
      return (
        <Grid container justify='center'>
          <Grid item xs={4}>
            <InfoArea
              icon={CircularProgress}
              iconColor='warning'
              title='Creating Wallet'
              description='Please wait until your wallet is ready'
            />
          </Grid>
        </Grid>
      )
    } else {
      if (isBusiness) {
        return this.renderBusiness()
      } else {
        return this.renderIndividual()
      }
    }
  }

  renderIndividual() {
    const { classes, downloadWallet } = this.props;
    // TODO: move the form into its own component with redux-form
    return (
      <Grid container justify='center'>
        <Grid item xs={12} sm={12} md={9}>
            <h5>Your Chlu Wallet is now created. You must download and save your public and private keys to continue.</h5>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Button color='success' onClick={downloadWallet}>
            Save My Keys
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <hr></hr>
          <h3>Apply To Become a Trusted Reviewer</h3>
          <h5 className={classes.infoText}>
            At Chlu, we are focused on solving the epedemic of fake reviews online.
            We are creating a global network of Trusted Reviewers, rewarded by earning Chlu token for creating verified reviews.
            Anyone can create a review with Chlu, but <em>only Trusted Reviewers can earn Chlu token</em>.
            There are three requirements to earn Chlu token from writing a review:
            <ul>
              <li>The reviewer must be a Trusted Reviewer who has provided <a href='https://en.wikipedia.org/wiki/Know_your_customer'>KYC</a> data</li>
              <li>There must be verified proof of payment associated with the review - the Chlu protocol leverages verifable proof using blockchain technology</li>
              <li>The review must be found useful by others</li>
            </ul>
          </h5>
          <h5 className={classes.infoText}>
            To apply to become a trusted reviewer, which will also enable you to be whitelisted to participate in the <a href='www.google.com'>future Chlu Token Sale</a>, you need to provide the following KYC data below:
          </h5>
        </Grid>
        <Grid item xs={12} sm={4}>
          <PictureUpload/>
          <div className={classes.description}>Upload Passport Photo</div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <CustomInput
            labelText={
              <span>
                First Name <small>(optional)</small>
              </span>
            }
            id='firstname'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            labelText={
              <span>
                Last Name <small>(optional)</small>
              </span>
            }
            id='lastname'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
    )
  }

  renderBusiness() {
    const { classes, walletSaved, downloadWallet } = this.props;
    return (
      <div>
        { <Grid container justify='center'>
          <Grid item xs={12} sm={12} md={9}>
            <h5>Your Chlu Wallet is now created. You must download and save your public and private keys to continue.</h5>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Button color='success' onClick={downloadWallet}>
              Save My Keys
            </Button>
          </Grid>
        </Grid> }
        { !walletSaved && <hr></hr> }
        <Grid container justify='center'>
          <Grid item xs={12} sm={12} md={12} className={classes.itemGrid}>
            <h4 className={classes.infoText}>Do You Manage An Online Profile That Receives Ratings & Reviews?</h4>
          </Grid>
          <Grid item xs={12} sm={12} md={3} className={classes.itemGrid}>
            <InfoArea
              title='Select Profile Type'
              description='Select Your Profile Type That Currently Receives Reviews - Individual, Business or Specific Product'
              icon={AccountBox}
              iconColor='rose'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} className={classes.itemGrid}>
            <InfoArea
              title='Profile Websites'
              description='Enter Your Email & Password On the Sites Where That Profile Exists'
              icon={Web}
              iconColor='primary'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} className={classes.itemGrid}>
            <InfoArea
              title='Get Portable Reputation'
              description='We Merge, Normalize & Decentrally Store Your Ratings & Reviews So You Can Take them to Any Website'
              icon={StarHalf}
              iconColor='info'
            />
          </Grid>
        </Grid>
        <Grid container>
          <NavPills
            color='info'
            alignCenter
            tabs={[
              {
                tabButton: 'Individuals',
                tabIcon: Person,
                tabContent: (
                  <RegularCard
                    cardTitle={[
                      <p key={0} style={{ textAlign:'center' }}>To begin, simply enter your email & password for any of the sites below on which you have an active profile.</p>,
                      <p key={1} style={{ textAlign:'center' }}>We extract, merge and decentrally store your reputation in a portable format so you own and control it.</p>
                    ]}
                    content={<ImportReviews userType='individual' />}
                  />
                )
              },
              {
                tabButton: 'Businesses',
                tabIcon: Business,
                tabContent: (
                  <RegularCard
                    cardTitle={[
                      <p key={0} style={{ textAlign: 'center' }}>To begin, simply enter your email & password for any of the sites below on which you have an active profile.</p>,
                      <p key={1} style={{ textAlign: 'center' }}>We extract, merge and decentrally store your reputation in a portable format so you own and control it.</p>
                    ]}
                    content={<ImportReviews userType='business' />}
                  />
                )
              }
            ]}
          />
        </Grid>
        <Grid container justify='flex-end'>
          <Grid item xs={12} sm={12} md={12} className={classes.infoText}>
            <p>Chlu guarantees that no information submitted from this form is ever stored on our system</p>
            <p>By submitting this form you acknowledge you are entitled to invoke your <a href='https://gdpr-info.eu/recitals/no-63/'>data access rights</a> and
            <a href='https://www.i-scoop.eu/gdprarticle/gdpr-article-20-right-data-portability/'> data portability rights</a> under European <a href='https://www.eugdpr.org/'>GDPR</a> legislation.
            </p>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(style)(Step3);
