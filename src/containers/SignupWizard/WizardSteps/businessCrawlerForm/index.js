import React from 'react';
// components
import { LinearProgress, Grid } from '@material-ui/core'

// styles
import regularFormsStyle from 'styles/material-dashboard-pro-react/views/regularFormsStyle';
import { withStyles } from '@material-ui/core'

// redux
import { connect } from 'react-redux'

// redux form
import { reduxForm } from 'redux-form'

import YelpForm from './YelpForm';
import TripadvisorForm from './TripadvisorForm';

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

class BusinessCrawlerForm extends React.Component {

  render () {
    const { handleSubmit, crawlerRunning } = this.props

    if (crawlerRunning) {
      return (
        <Grid container justify='center'>
          <Grid item xs={12} md={12} >
            <LinearProgress size={100} />
          </Grid>
        </Grid>
      )
    } else {
      return (
        <span>
          <form onSubmit={handleSubmit}>
            <Grid container justify='center'>
              <YelpForm onChange={(url, user, pass) => this.props.onChange("yelp", url, user, pass)} />
              <TripadvisorForm onChange={(url, user, pass) => this.props.onChange("tripadvisor", url, user, pass)} />
            </Grid>
          </form>
        </span>
      )
    }
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = {
}

const BusinessCrawlerReduxForm = reduxForm({
  form: 'businessCrawlerForm'
})(BusinessCrawlerForm)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(BusinessCrawlerReduxForm))
