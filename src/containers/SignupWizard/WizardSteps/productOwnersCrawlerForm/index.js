import React from 'react';
// components
import { Grid, LinearProgress } from '@material-ui/core'

// styles
import regularFormsStyle from 'styles/material-dashboard-pro-react/views/regularFormsStyle';
import { withStyles } from '@material-ui/core'

// redux
import { connect } from 'react-redux'

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
  // print the form values to the console
  console.log(values)
}


class ProductOwnersCrawlerForm extends React.Component {
  
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
            
            {<RenderEmailPasswordCombo emailName='amazon-email'
                                       emailLabel='Amazon email'
                                       emailHelp='We never store your Amazon email'
                                       passwordName='amazon-password'
                                       passwordLabel='Amazon password'
                                       passwordHelp='We never store your Amazon password' />
            }
            
            {<RenderEmailPasswordCombo emailName='taobao-email'
                                       emailLabel='Taobao email'
                                       emailHelp='We never store your Taobao email'
                                       passwordName='taobao-password'
                                       passwordLabel='Taobao password'
                                       passwordHelp='We never store your Taobao password' />
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

const ProductOwnersCrawlerReduxForm = reduxForm({
  form: 'productOwnersCrawlerForm',
  onSubmit: submit
})(ProductOwnersCrawlerForm)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ProductOwnersCrawlerReduxForm))
