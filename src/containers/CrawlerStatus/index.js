import React, { Component } from 'react'
// components
import {
  withStyles,
  CardHeader,
  Grid,
  Card,
  CardActions,
  Button
} from '@material-ui/core'
// icons
import ImportIcon from '@material-ui/icons/CloudUpload'
// redux
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { pollCrawlerStatus } from 'store/modules/data/crawler'
import { push } from 'react-router-redux'

const styles = {
  root: {
    padding: '20px'
  },
}

class CrawlerStatus extends Component {

  componentDidMount() {
    this.props.pollCrawlerStatus()
  }

  goToImportPage = () => this.props.push('/import')

  render() {
    const { classes, loading, starting, running } = this.props
    const subtitle = 
      loading ? 'Checking Status...'
      : starting ? 'Starting import process...'
      : running ? 'An import operation is in progress'
      : 'No import process running for your DID'
    return (<Grid container spacing={16} className={classes.root}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            avatar={<ImportIcon />}
            title='Import Reviews'
            subheader={subtitle}
          />
          <CardActions>
            <Button disabled={loading || starting || running} onClick={this.goToImportPage}>
              Import Now 
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>)
  }
}

const mapStateToProps = state => ({
  loading: state.data.crawler.loading,
  starting: state.data.crawler.starting,
  running: state.data.crawler.running,
})

const mapDispatchToProps = {
  pollCrawlerStatus,
  push
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(CrawlerStatus)