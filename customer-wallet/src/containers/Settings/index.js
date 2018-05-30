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
// redux
import { compose } from 'recompose';
// helpers
import { downloadWallet, getAddress } from '../../helpers/wallet';
// icons
import DownloadIcon from '@material-ui/icons/FileDownload'
import DeleteIcon from '@material-ui/icons/Delete'

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

  handleDownload = () => downloadWallet(this.props.wallet)

  render () {
    const { wallet, classes } = this.props
    const address = getAddress(wallet)

    return <Card className={classes.card}>
      <CardContent>
        <Typography variant='headline' component='h2'>
          Your Wallet
        </Typography>
        <Typography component='p'>
          {address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='raised' onClick={this.handleDownload}>
          <DownloadIcon/> Download
        </Button>
        <Button variant='raised' color='secondary'>
          <DeleteIcon/> Delete
        </Button>
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
