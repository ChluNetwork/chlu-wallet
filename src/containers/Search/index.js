import React, { Component } from 'react'
import { object } from 'prop-types'
import { get } from 'lodash'
// components
import { Button, Card, CardContent, CardActions, CardHeader, Divider, Grid, InputAdornment } from '@material-ui/core'
import { Avatar, withStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ReactCopyToClipBoard from 'react-copy-to-clipboard'
// redux
import { compose } from 'recompose';
import { connect } from 'react-redux'
// helpers
import { downloadWallet, getAddress } from 'helpers/wallet';

import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'


// icons
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';
import DownloadIcon from '@material-ui/icons/FileDownload'
import UserIcon from '@material-ui/icons/Person'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import KeyIcon from '@material-ui/icons/Lock'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import SearchIcon from '@material-ui/icons/Search';



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  card: {
    margin: '30px'
  }
});

class Search extends Component {
  constructor(props) {
    super(props);
  }


  render () {
    const { wallet, classes } = this.props

    return <Card className={classes.card}>
        <CardHeader
            subheader='Find People or Busineses to Pay, Review & Earn Chlu'
        />
        <Divider/>
        <CardContent>

        </CardContent>
      </Card>
  }
}

export default withStyles(styles)(Search);
