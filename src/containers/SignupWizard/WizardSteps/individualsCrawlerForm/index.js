import React from 'react';
// components
import { LinearProgress, Grid, List, ListItem, ListItemText, Checkbox } from '@material-ui/core'

// styles
import regularFormsStyle from 'styles/material-dashboard-pro-react/views/regularFormsStyle';
import { withStyles } from '@material-ui/core'

// redux
import { connect } from 'react-redux'
import { compose } from 'recompose'

// redux form
import { reduxForm } from 'redux-form'

import UpWorkForm from './UpWorkForm'
import FiverrForm from './FiverrForm';
import LinkedinForm from './LinkedinForm';

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

class IndividualsCrawlerForm extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    const { handleSubmit, crawlerRunning } = this.props

    if (crawlerRunning) {
      return <Grid container justify='center'>
        <Grid item xs={12} md={12} >
          <LinearProgress size={100} />
        </Grid>
      </Grid>
    } else {
      return (
        <span>
          <form onSubmit={handleSubmit}>
            <Grid container justify='center'>
              <Grid item xs={12} md={12}>
                <UpWorkForm onChange={(url, user, pass) => this.props.onChange("upwork", url, user, pass)} />
                <LinkedinForm onChange={(user, pass) => this.props.onChange("linkedin", undefined, user, pass)} />
                <FiverrForm onChange={(url, user, pass) => this.props.onChange("fiverr", url, user, pass)} />
              </Grid>
            </Grid>
          </form>
        </span>
      )
    }
  }
}

const mapStateToProps = store => ({
  crawlerRunning: store.data.crawler.running,
  wallet: store.data.wallet
})

const IndividualsCrawlerReduxForm = reduxForm({
  form: 'individualsCrawlerForm'
})(IndividualsCrawlerForm)

export default compose(
  withStyles(style),
  connect(mapStateToProps)
)(IndividualsCrawlerReduxForm)
