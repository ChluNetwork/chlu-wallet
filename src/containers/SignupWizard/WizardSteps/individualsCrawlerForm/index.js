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
  dispatch(startCrawler('upwork', values['upwork-email']))
}


class IndividualsCrawlerForm extends React.Component {
  
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
            
            {<RenderEmailPasswordCombo emailName='linkedin-email'
                                       emailLabel='Linkedin email'
                                       emailHelp='We never store your Linkedin email'
                                       passwordName='linkedin-password'
                                       passwordLabel='Linkedin password'
                                       passwordHelp='We never store your Linkedin password' />
            }
            
            {<RenderEmailPasswordCombo emailName='upwork-email'
                                       emailLabel='UpWork email'
                                       emailHelp='We never store your UpWork email'
                                       passwordName='upwork-password'
                                       passwordLabel='UpWork password'
                                       passwordHelp='We never store your UpWork password' />
            }
            
            {<RenderEmailPasswordCombo emailName='fiverr-email'
                                       emailLabel='Fiverr email'
                                       emailHelp='We never store your Fiverr email'
                                       passwordName='fiverr-password'
                                       passwordLabel='Fiverr password'
                                       passwordHelp='We never store your Fiverr password' />
            }
            
            {<RenderEmailPasswordCombo emailName='flexhire-email'
                                       emailLabel='Flexhire email'
                                       emailHelp='We never store your Flexhire email'
                                       passwordName='flexhire-password'
                                       passwordLabel='Flexhire password'
                                       passwordHelp='We never store your Flexhire password' />
            }
            
          </Grid>      
        </form>
      </span>
      )
    }
  }
}

const mapStateToProps = store => ({
  crawlerRunning: store.data.crawler.running
})

const mapDispatchToProps = {
}

const IndividualsCrawlerReduxForm = reduxForm({
  form: 'individualsCrawlerForm',
  onSubmit: submit
})(IndividualsCrawlerForm)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(IndividualsCrawlerReduxForm))
