import React from 'react';
// components
import {
  withStyles,
  InputAdornment,
  Grid,
  Checkbox,
  FormControlLabel
} from '@material-ui/core'
// custom components
import CustomInput from 'components/MaterialDashboardPro/CustomInput';
// icons
import Face from '@material-ui/icons/Face';
import Email from '@material-ui/icons/Email';
import Check from '@material-ui/icons/Check';
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
    const { classes } = this.props;
    return (
    <Grid container justify='center'>
      <Grid item xs={12} sm={12} md={6}>
        <form action='/myreputation' className={classes.form} onSubmit={this.testSubmit}>
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
          <FormControlLabel
            classes={{
              root: classes.checkboxLabelControl,
              label: classes.checkboxLabel
            }}
            control={
              <Checkbox
                tabIndex={-1}
                onClick={() => this.handleToggle(1)}
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
                <a href='#pablo'>terms and conditions</a>.
              </span>
            }
          />
        </form>
      </Grid>
    </Grid>
    );
  }
}

export default withStyles(style)(Step1);
