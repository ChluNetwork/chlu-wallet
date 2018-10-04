import React, { Component } from 'react'
import { Button, Grid, Card, CardContent, withStyles, CardActions } from '@material-ui/core'
import ImportReviews from './ImportReviews'
// Redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { importReviews } from 'store/modules/data/crawler'

const styles = {
  root: {
    padding: '20px'
  },
  button: {
    marginLeft: 'auto'
  }
}

class ImportReviewsPage extends Component {
  render() {
    const { classes, importReviews, running, starting, loading } = this.props
    return (<Grid container spacing={16} justify='center' className={classes.root}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <ImportReviews showSubmitButton={true} />
          </CardContent>
          <CardActions>
            { !loading && !running && <Button
                onClick={importReviews}
                disabled={running || starting || loading}
                variant='contained'
                color='primary'
                type='submit'
                className={classes.button}
              >
              Start
            </Button> }
          </CardActions>
        </Card>
      </Grid>
    </Grid>)
  }
}

const mapStateToProps = state => ({
  running: state.data.crawler.running,
  starting: state.data.crawler.starting,
  loading: state.data.crawler.loading
})

const mapDispatchToProps = {
  importReviews
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ImportReviewsPage)