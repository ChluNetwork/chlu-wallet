import React from 'react';

// components
import { Grid, CircularProgress } from '@material-ui/core'

// icons
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Person from '@material-ui/icons/Person';
import AccountBox from '@material-ui/icons/AccountBox';
import Web from '@material-ui/icons/Web';
import StarHalf from '@material-ui/icons/StarHalf';
import Business from '@material-ui/icons/Business';
import DoneIcon from '@material-ui/icons/Done'
import ReputationIcon from '@material-ui/icons/Star'
import DownloadIcon from '@material-ui/icons/FileDownload'

// custom components
import Button from 'components/MaterialDashboardPro/Button'
import RegularCard from 'components/MaterialDashboardPro/RegularCard'
import NavPills from 'components/MaterialDashboardPro/NavPills'
import InfoArea from 'components/MaterialDashboardPro/InfoArea'

// styles
import regularFormsStyle from 'styles/material-dashboard-pro-react/views/regularFormsStyle';
import { withStyles } from '@material-ui/core'

// helpers
import { isEmpty } from 'lodash'

import IndividualsCrawlerForm from './individualsCrawlerForm'
import BusinessCrawlerForm from './businessCrawlerForm'
import ProductOwnersCrawlerForm from './productOwnersCrawlerForm'

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
    const { classes, reviews, downloadWallet, reputationLoading: loading, push } = this.props;

    if (loading) {
      return (
        <Grid container justify='center'>
          <Grid item xs={4}>
            <InfoArea
              icon={CircularProgress}
              iconColor='warning'
              title='Checking your Reputation'
              description='Please wait while we check your Decentralised Reputation'
            />
          </Grid>
        </Grid>
      )
    } else if (!isEmpty(reviews)) {
      return (
        <Grid container justify='center'>
          <Grid item xs={4}>
            <InfoArea
              icon={DoneIcon}
              iconColor='success'
              title='All done'
              description='You have imported your reputation'
            >
              <Button color='success' onClick={() => push('/reputation')}>
                <ReputationIcon/> View My Reputation
              </Button>
            </InfoArea>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <div>
          <Grid container justify='center'>
            <Grid item xs={12} sm={12} md={9}>
              <h5>Your Chlu Wallet is now created. You must download and save your public and private keys to continue.</h5>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Button color='success' onClick={downloadWallet}>
                <DownloadIcon/> Save My Keys
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <hr></hr>
            </Grid>
            <Grid item xs={12} sm={12} md={9} className={classes.itemGrid}>
              <br></br>
              <h4 className={classes.infoText}>Do You Manage An Online Profile That Receives Ratings & Reviews?</h4>
            </Grid>
          </Grid>
          <Grid container justify='center'>
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
            <br></br>
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
                      content={<IndividualsCrawlerForm />}
                    />
                  )
                },
                {
                  tabButton: 'Businesses',
                  tabIcon: Business,
                  tabContent: (
                    <RegularCard
                      cardTitle='To begin, simply enter your email & password for any of the sites below on which you have an active profile.
                      We extract, merge and decentrally store your reputation in a portable format so you own and control it.'
                      content={<BusinessCrawlerForm />}
                    />
                  )
                },
                {
                  tabButton: 'Product Owners',
                  tabIcon: ShoppingCart,
                  tabContent: (
                  <RegularCard
                    cardTitle='To begin, simply enter your email & password for any of the sites below on which you have an active profile.
                    We extract, merge and decentrally store your reputation in a portable format so you own and control it.'
                    content={<ProductOwnersCrawlerForm />}
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
}

export default withStyles(style)(Step3);
