import React, { Component } from 'react'
import { shape, bool, string, oneOfType } from 'prop-types'
// redux
import { connect } from 'react-redux'
// helpers
import get from 'lodash/get'
// libs
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toastr } from 'react-redux-toastr'
import fileDownload from 'js-file-download'
// components
import Button from '@material-ui/core/Button'
import { Card, CardContent, Typography, CardActions, withStyles } from '@material-ui/core';
import { compose } from 'recompose';

const cardStyle = {
  card: {
    margin: '30px'
  }
}

class Settings extends Component {
  static propTypes = {
    wallet: shape({
      mnemonic: string,
      createWallet: shape({ mnemonic: oneOfType([bool, string]) })
    })
  }

  handleCopy = (data) => data ? toastr.success('Copied', 'Your mnemonic has been copied to the clipboard') : toastr.error('failed', 'Copying failed')
  handleDownload = (mnemonic) => () => fileDownload(mnemonic, 'mnemonic_key.txt')

  render () {
    const { wallet, classes } = this.props
    const mnemonic = get(wallet, 'mnemonic')

    return <Card className={classes.card}>
      <CardContent>
        <Typography variant='headline' component='h2'>
          Your Mnemonic
        </Typography>
        <Typography component='p'>
          {mnemonic}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={this.handleDownload(mnemonic)}>Download</Button>
        <CopyToClipboard text={mnemonic} onCopy={this.handleCopy}>
          <Button size='small'>Copy</Button>
        </CopyToClipboard>
      </CardActions>
    </Card>
  }
}

const mapStateToProps = store => ({
  wallet: store.data.wallet
})

export default compose(
  connect(mapStateToProps),
  withStyles(cardStyle)
)(Settings)
