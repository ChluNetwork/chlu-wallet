import React, { Component } from 'react'
// components
import {
  withStyles,
  InputAdornment,
  Grid,
  Checkbox,
  Radio,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import ProfileImageUpload from 'components/ProfileImageUpload'
import CustomInput from 'components/Form/CustomInput';
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
// icons
import Face from '@material-ui/icons/Face'
import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'
import Web from '@material-ui/icons/Web'
import DoneIcon from '@material-ui/icons/Done'
import Check from '@material-ui/icons/Check'
import FiberManualRecord from "@material-ui/icons/FiberManualRecord"
import BusinessLocationField from './BusinessLocationField';
// style
import customSelectStyle from 'styles/material-dashboard-pro-react/customSelectStyle.jsx';
import customCheckboxRadioSwitch from 'styles/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';
// data
import { businessTypes } from 'store/modules/ui/profile';
// redux
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'

const ProfileImageUploadForm = ({ input: { value, onChange } }) => (<ProfileImageUpload
  imageDataUrl={value}
  onChoosePicture={onChange}
/>)

const SelectForm = (props) => {
  console.log(props)
  const { input: { value, onChange }, helpText, options, classes } = props
  return <FormControl fullWidth className={classes.selectFormControl}>
      <InputLabel htmlFor='simple-select' className={classes.selectLabel}>
        {helpText}
      </InputLabel>
      <Select
        MenuProps={{ className: classes.selectMenu }}
        classes={{ select: classes.select }}
        value={value}
        onChange={onChange}
      >
        {options.map((v, i) => (
          <MenuItem
            key={i}
            value={i}
            disabled={!i}
            classes={{ root: classes.selectMenuItem, selected: i ? classes.selectMenuItemSelected : undefined }}
          >{v}</MenuItem>
        ))}
      </Select>
    </FormControl>

}

class ProfileForm extends Component {

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        {this.renderUser()}
        {this.renderBusiness()}
      </form>
    )
  }

  renderUser() {
    const { classes, userType } = this.props
    if (userType !== 'individual') return undefined
    return (
      <Grid container justify='center' spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <Field
            name='avatarDataUrl'
            component={ProfileImageUploadForm}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Field
            name='email'
            type='email'
            component={CustomInput}
            labelText={<span>Email</span>}
            formControlProps={{ fullWidth: true }}
            inputProps={{
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Field
            name='username'
            component={CustomInput}
            labelText={<span>User Name</span>}
            formControlProps={{ fullWidth: true }}
            inputProps={{
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Field
            name='firstname'
            component={CustomInput}
            labelText={<span>First Name</span>}
            formControlProps={{ fullWidth: true }}
            inputProps={{
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Field
            name='lastname'
            component={CustomInput}
            labelText={<span>Last Name</span>}
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: event => this.change(event.target.value, 'lastname', 'length', 3),
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

  renderBusiness() {
    const { classes, userType } = this.props
    if (userType !== 'business') return undefined
    return (
      <Grid container justify='center' spacing={16}>
        <Grid item xs={12} sm={12} md={12}>
          <Field
            name='avatarDataUrl'
            component={ProfileImageUploadForm}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Field
            name='businessname'
            component={CustomInput}
            labelText={<span>Business Name</span>}
            formControlProps={{ fullWidth: true }}
            inputProps={{
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Field
            name='businesstype'
            component={SelectForm}
            labelText={<span>Business Type</span>}
            options={businessTypes}
            classes={classes}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor='simple-select' className={classes.selectLabel}>
              Business Type
            </InputLabel>

            <Select
              MenuProps={{ className: classes.selectMenu }}
              classes={{ select: classes.select }}
              value={this.state.businesstype}
              onChange={this.handleSimple}
            >
              {businessTypes.map((v, i) => (
                <MenuItem key={i} value={i} disabled={!i} classes={{ root: classes.selectMenuItem, selected: i ? classes.selectMenuItemSelected : undefined }}>{v}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <CustomInput
            labelText={<span>Email</span>}
            id='email'
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: event => this.change(event.target.value, 'email', 'length', 3),
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <CustomInput
            labelText={<span>Website</span>}
            id='website'
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: event => this.change(event.target.value, 'website', 'length', 3),
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Web className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <CustomInput
            labelText={<span>Phone</span>}
            id='phone'
            formControlProps={{ fullWidth: true }}
            inputProps={{
              onChange: event => this.change(event.target.value, 'phone', 'length', 3),
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Phone className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={10}>
          <CustomInput
            labelText='A brief description of your business.'
            id='about-me'
            formControlProps={{ fullWidth: true }}
            inputProps={{ onChange: event => this.change(event.target.value, 'businessdescription') }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={10}>
          <BusinessLocationField
            value={this.state.businesslocation}
            onChange={value => this.change(value, 'businesslocation')}
            classes={classes}
          />
        </Grid>
      </Grid>
    )
  }
}

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

export default compose(
  withStyles(style),
  reduxForm({
    form: 'profile-form'
  })
)(ProfileForm)