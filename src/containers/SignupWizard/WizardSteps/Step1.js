import React from 'react';
// components
import {
  withStyles,
  InputAdornment,
  Grid,
  Checkbox,
  Radio,
  FormControlLabel
} from '@material-ui/core'

import { Link } from 'react-router-dom'
// custom components
import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
import PictureUpload from 'components/MaterialDashboardPro/PictureUpload'

// icons
import Face from '@material-ui/icons/Face';
import Email from '@material-ui/icons/Email';
import DoneIcon from '@material-ui/icons/Done'
import Check from '@material-ui/icons/Check';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// style
import customSelectStyle from 'styles/material-dashboard-pro-react/customSelectStyle.jsx';
import customCheckboxRadioSwitch from 'styles/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';

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
  description: {
    textAlign: 'center'
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      firstnameState: "",
      lastname: "",
      lastnameState: "",
      email: "",
      emailState: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }
  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }



  toggleAcceptTerms() {
    this.props.setAcceptTermsAndConditions(!this.props.acceptedTerms)
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
    const { classes, wallet } = this.props;
    if (wallet && wallet.did) {
      return <Grid container justify='center'>
        <Grid item xs={4}>
          <InfoArea
            icon={DoneIcon}
            iconColor='success'
            title='All done'
            description='Your wallet is ready to go'
          />
        </Grid>
      </Grid>
    } else {
      return (
        <Grid container justify='center'>
          <Grid item xs={12} sm={12} md={6}>
            <form action='/myreputation' className={classes.form} onSubmit={this.testSubmit}>

            <div>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedValue === "a"}
                  onChange={this.handleChange}
                  value="a"
                  name="radio button demo"
                  aria-label="A"
                  icon={
                    <FiberManualRecord
                      className={classes.radioUnchecked}
                    />
                  }
                  checkedIcon={
                    <FiberManualRecord
                      className={classes.radioChecked}
                    />
                  }
                  classes={{
                    checked: classes.radio
                  }}
                />
              }
              classes={{
                label: classes.label
              }}
              label="Create A User Account. Used to Pay, Review & Earn Chlu"
            />
          </div>
          <div
            className={
              classes.checkboxAndRadio +
              " " +
              classes.checkboxAndRadioHorizontal
            }
          >
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedValue === "b"}
                  onChange={this.handleChange}
                  value="b"
                  name="radio button demo"
                  aria-label="B"
                  icon={
                    <FiberManualRecord
                      className={classes.radioUnchecked}
                    />
                  }
                  checkedIcon={
                    <FiberManualRecord
                      className={classes.radioChecked}
                    />
                  }
                  classes={{
                    checked: classes.radio
                  }}
                />
              }
              classes={{
                label: classes.label
              }}
              label="Create A Business Account. Own, Merge and Port Your Online Reviews"
            />
          </div>


            <PictureUpload/>
            <div className={classes.description}>Upload Passport Photo</div>
            <CustomInput
              success={this.state.emailState === 'success'}
              error={this.state.emailState === 'error'}
              labelText={
                <span>
                  Email <small>(required)</small>
                </span>
              }
              id='email'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, 'email', 'length', 3),
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
            <CustomInput
              success={this.state.usernameState === 'success'}
              error={this.state.usernameState === 'error'}
              labelText={
                <span>
                  User Name <small>(required)</small>
                </span>
              }
              id='username'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: event => this.change(event, 'username', 'length', 3),
                endAdornment: (
                  <InputAdornment position='end' className={classes.inputAdornment}>
                    <Face className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
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



              <FormControlLabel
                classes={{
                  root: classes.checkboxLabelControl,
                  label: classes.checkboxLabel
                }}
                control={
                  <Checkbox
                    tabIndex={-1}
                    checked={this.props.acceptedTerms}
                    onClick={this.toggleAcceptTerms.bind(this)}
                    checkedIcon={
                      <Check className={classes.checkedIcon} />
                    }
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked
                    }}
                  />
                }
                label={
                  <span>
                    I agree to the{' '}
                    <Link to='/terms'>terms and conditions</Link>.
                  </span>
                }
              />
            </form>
          </Grid>
        </Grid>
      )
    }
  }
}

export default withStyles(style)(Step1)
