import React from 'react';
// components
import { Grid } from '@material-ui/core'
// styles
import regularFormsStyle from 'styles/material-dashboard-pro-react/views/regularFormsStyle';
import { withStyles } from '@material-ui/core'
// Forms
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
    return (
      <Grid container justify='center'>
        <YelpForm />
        <TripadvisorForm />
      </Grid>
    )
  }
}

export default withStyles(style)(BusinessCrawlerForm)
