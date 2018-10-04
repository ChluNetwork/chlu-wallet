import React, { Component } from 'react'
// Components
import { Grid, CircularProgress } from '@material-ui/core'
import RegularCard from 'components/MaterialDashboardPro/RegularCard'
import NavPills from 'components/MaterialDashboardPro/NavPills'
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
// Icons
import Person from '@material-ui/icons/Person';
import Business from '@material-ui/icons/Business';
// Form
import ImportReviewsForm from './form'
// Redux
import { connect } from 'react-redux'
import { pollCrawlerStatus } from 'store/modules/data/crawler'

class ImportReviews extends Component {

  componentDidMount() {
    this.props.pollCrawlerStatus()
  }

  render () {
    const { running, starting, loading  } = this.props

    if (loading || starting) {
      return (
        <InfoArea
          icon={CircularProgress}
          title='Checking Status'
          description='Please Wait'
        />
      )
    } else if (running) {
      return (
        <InfoArea
          icon={CircularProgress}
          title='In Progress'
          description='An import operation is already in progress'
        />
      )
    } else {
      return (<Grid container justify='center'>
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
                  content={<ImportReviewsForm userType='individual' />}
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
                  content={<ImportReviewsForm userType='business' />}
                />
              )
            }
          ]}
        />
        <Grid item xs={12} sm={12} md={12}>
          <p>Chlu guarantees that no information submitted from this form is ever stored on our system</p>
          <p>By submitting this form you acknowledge you are entitled to invoke your <a href='https://gdpr-info.eu/recitals/no-63/'>data access rights</a> and
          <a href='https://www.i-scoop.eu/gdprarticle/gdpr-article-20-right-data-portability/'> data portability rights</a> under European <a href='https://www.eugdpr.org/'>GDPR</a> legislation.
          </p>
        </Grid>
      </Grid>)
    }
  }
}

const mapStateToProps = state => ({
  loading: state.data.crawler.loading,
  starting: state.data.crawler.starting,
  running: state.data.crawler.running,
})

const mapDispatchToProps = {
  pollCrawlerStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportReviews)