import React, { Component } from 'react'
// Components
import { LinearProgress, Grid } from '@material-ui/core'
// Forms
import BusinessCrawlerForm from './businessCrawlerForm';
import IndividualsCrawlerForm from './individualsCrawlerForm';
// redux
import { reduxForm } from 'redux-form'

class ImportReviews extends Component {
  render () {
    const { handleSubmit, crawlerRunning, userType, ...otherProps } = this.props
    const isBusiness = userType === 'business'
    const Form = isBusiness ? BusinessCrawlerForm : IndividualsCrawlerForm

    if (crawlerRunning) {
      return (
        <Grid container justify='center'>
          <Grid item xs={12} md={12} >
              <LinearProgress size={100} />
          </Grid>
        </Grid>
      )
    } else {
      return <form onSubmit={handleSubmit}>
        <Form {...otherProps} />
      </form>
    }
  }
}

export default reduxForm({
  form: 'import-reviews'
})(ImportReviews)