import React from 'react';
// components
import { withStyles, Grid, InputAdornment, CircularProgress } from '@material-ui/core'
// custom components
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'
import CustomInput from 'components/MaterialDashboardPro/CustomInput'
import Button from 'components/MaterialDashboardPro/Button'
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
// icon
import Face from '@material-ui/icons/Face'
import DoneIcon from '@material-ui/icons/Done'
import DownloadIcon from '@material-ui/icons/FileDownload'
// style
import customSelectStyle from 'styles/material-dashboard-pro-react/customSelectStyle.jsx'
import customCheckboxRadioSwitch from 'styles/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx'

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  choice: {
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px'
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      firstnameState: '',
      lastname: '',
      lastnameState: '',
      email: '',
      emailState: ''
    };
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case 'email':
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'length':
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }


  render() {
    const { classes, loading, walletCreated, downloadWallet, wallet } = this.props;

    if (wallet && wallet.did) {
      return <Grid container justify='center'>
        <Grid item xs={4}>
          <InfoArea
            icon={DoneIcon}
            iconColor='success'
            title='All done'
            description='You have saved your Keys'
          >
            <Button color='success' onClick={downloadWallet}>
              <DownloadIcon/> Download again
            </Button>
          </InfoArea>
        </Grid>
      </Grid>
    } else if (loading || !walletCreated) {
      return <Grid container justify='center'>
        <Grid item xs={4}>
          <InfoArea
            icon={CircularProgress}
            iconColor='warning'
            title='Creating Wallet'
            description='Please wait until your wallet is ready'
          />
        </Grid>
      </Grid>
    } else {
      return (
        <Grid container justify='center'>
          <Grid item xs={12} sm={12} md={12}>
              <h4>Your Decentralized Identifier (D.I.D.): <b>{walletCreated.did.publicDidDocument.id}</b></h4>
              <a href="#DID">What is a D.I.D?</a>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button color='success' onClick={downloadWallet}>
              <DownloadIcon/> Download Your Credentials
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <hr></hr>
            <h4 className={classes.infoText}>
              If You Would Like to Earn More Chlu Tokens, Become a Verified Reviewer By Adding Your Personal Information Below:
            </h4>
          </Grid>
          <Grid item xs={12} sm={4}>
            <PictureUpload/>
          </Grid>
          <Grid item xs={12} sm={8}>
            <CustomInput
              success={this.state.firstnameState === 'success'}
              error={this.state.firstnameState === 'error'}
              labelText={
                <span>
                  First Name <small>(optional)</small>
                </span>
              }
              id='firstname'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, 'firstname', 'length', 3),
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
            <CustomInput
              success={this.state.lastnameState === 'success'}
              error={this.state.lastnameState === 'error'}
              labelText={
                <span>
                  Last Name <small>(optional)</small>
                </span>
              }
              id='lastname'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, 'lastname', 'length', 3),
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      )
    }
  }
}

export default withStyles(style)(Step2)
