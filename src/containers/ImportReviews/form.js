import React, { Component } from 'react'
// components
import { withStyles, Button } from '@material-ui/core'
// Forms
import BusinessCrawlerForm from './businessCrawlerForm';
import IndividualsCrawlerForm from './individualsCrawlerForm';
// redux
import { reduxForm } from 'redux-form'
import { compose } from 'recompose'

const styles = {
  button: {
    marginLeft: 'auto'
  }
}

class ImportReviewsForm extends Component {
  render () {
    const { classes, handleSubmit, userType, ...otherProps } = this.props
    const isBusiness = userType === 'business'
    const Form = isBusiness ? BusinessCrawlerForm : IndividualsCrawlerForm

    return <form onSubmit={handleSubmit}>
      <Form {...otherProps} />
    </form>
  }
}

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'import-reviews'
  })
)(ImportReviewsForm)