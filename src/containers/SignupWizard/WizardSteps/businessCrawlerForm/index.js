import React from 'react';
// components
import { LinearProgress, Grid } from '@material-ui/core'

// styles
import regularFormsStyle from 'styles/material-dashboard-pro-react/views/regularFormsStyle';
import { withStyles } from '@material-ui/core'

// redux
import { connect } from 'react-redux'
import { startCrawler } from 'store/modules/data/crawler';

// redux form
import { reduxForm } from 'redux-form'

import RenderEmailPasswordCombo from '../renderEmailPasswordCombo'

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

const submit = (values, dispatch, props) => {
  console.log(values)
  dispatch(startCrawler('yelp', values['yelp-email']))
}


class BusinessCrawlerForm extends React.Component {
  
  render () {
    const { handleSubmit, crawlerRunning } = this.props

    if (crawlerRunning) {
      return <Grid container justify='center'>
        <Grid item xs={12} md={12} >
          <LinearProgress size={100} />
        </Grid>
      </Grid>
    } else {
      return (<span>
        <form onSubmit={handleSubmit}>
          <Grid container justify='center'>
            
            {<RenderEmailPasswordCombo emailName='yelp-email'
                                       emailLabel='Yelp email'
                                       emailHelp='We never store your Yelp email'
                                       passwordName='yelp-password'
                                       passwordLabel='Yelp password'
                                       passwordHelp='We never store your Yelp password' />
            }
            {<RenderEmailPasswordCombo emailName='tripadvisor-email' emailLabel='Tripadvisor email'
                                       emailHelp='We never store your Tripadvisor email'
                                       passwordName='tripadvisor-password' passwordLabel='Tripadvisor password'
                                       passwordHelp='We never store your Tripadvisor password' />
            }
            
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
  form: 'businessCrawlerForm',
  onSubmit: submit
})(BusinessCrawlerForm)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(BusinessCrawlerReduxForm))
