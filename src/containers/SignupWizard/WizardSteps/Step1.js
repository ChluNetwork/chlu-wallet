import React from 'react';

// components
import {
  withStyles,
  Grid,
  Checkbox,
  Radio,
  FormControlLabel,
} from '@material-ui/core'

import { Link } from 'react-router-dom'

// custom components
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
import ProfileForm from 'containers/Profile/ProfileForm'

// icons
import DoneIcon from '@material-ui/icons/Done'
import Check from '@material-ui/icons/Check'
import FiberManualRecord from "@material-ui/icons/FiberManualRecord"

// style
import customSelectStyle from 'styles/material-dashboard-pro-react/customSelectStyle.jsx';
import customCheckboxRadioSwitch from 'styles/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';

const style = {
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: 'individual'
    };
  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });

    if (this.props.onSignupTypeChange) {
      this.props.onSignupTypeChange(event.target.value);
    }
  }

  handleToggle = value => {
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

  toggleAcceptTerms = () => {
    this.props.setAcceptTermsAndConditions(!this.props.acceptedTerms)
  }

  submit = values => {
    console.log(values)
    console.log(this.props)
    return this.props.onProfileSubmitted(values)
  }

  render() {
    const { classes, wallet } = this.props;

    if (wallet && wallet.did) {
      return (
        <Grid container justify='center'>
          <Grid item xs={4}>
            <InfoArea
              icon={DoneIcon}
              iconColor='success'
              title='All done'
              description='Your wallet is ready to go'
            />
          </Grid>
        </Grid>
      )
    } else {
      return (
        <form action='/myreputation' className={classes.form} onSubmit={this.testSubmit}>
          <Grid container justify='center' spacing={16}>
            <Grid item xs={12} sm={12} md={5}>
              <FormControlLabel
                classes={{ label: classes.label }}
                label='Create A Consumer Account'
                control={
                  <Radio
                    id='userAccount'
                    checked={this.state.selectedValue === 'individual'}
                    onChange={this.handleChange}
                    value='individual'
                    name='radio button demo'
                    aria-label='A'
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{ checked: classes.radio }}
                  />
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={5}>
              <FormControlLabel
                classes={{ label: classes.label }}
                label='Create A Business Account'
                control={
                  <Radio
                    checked={this.state.selectedValue === 'business'}
                    onChange={this.handleChange}
                    value='business'
                    name='radio button demo'
                    aria-label='B'
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{ checked: classes.radio }}
                  />
                }
              />
            </Grid>

            <ProfileForm
              userType={this.state.selectedValue}
              onSubmit={this.submit}
            />

            <Grid item xs={12} sm={12} md={10}>
              <FormControlLabel
                classes={{ root: classes.checkboxLabelControl, label: classes.checkboxLabel }}
                label={<span>I agree to the <Link to='/terms'>terms and conditions</Link>.</span>}
                control={
                  <Checkbox
                    tabIndex={-1}
                    checked={this.props.acceptedTerms}
                    onClick={this.toggleAcceptTerms}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{ checked: classes.checked }}
                  />
                }
              />
            </Grid>
          </Grid>
        </form>
      )
    }
  }
}

export default withStyles(style)(Step1)
