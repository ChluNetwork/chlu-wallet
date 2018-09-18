import React, { Component } from 'react'
// components
import {
  withStyles,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import ProfileImageUpload from 'components/ProfileImageUpload'
import CustomInput from 'components/Form/CustomInput';
// icons
import Face from '@material-ui/icons/Face'
import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'
import Web from '@material-ui/icons/Web'
import BusinessLocationField from './BusinessLocationField';
// style
import customSelectStyle from 'styles/material-dashboard-pro-react/customSelectStyle.jsx';
import customCheckboxRadioSwitch from 'styles/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';
// data
import { businessTypes } from 'store/modules/ui/profile';
// redux
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
// validation
import { validateProfile } from 'chlu-marketplace-js/src/profile'

const ProfileImageUploadForm = props => {
  const { input: { value, onChange } } = props
  return <ProfileImageUpload
    imageDataUrl={value}
    onChoosePicture={onChange}
  />
}

const SelectForm = props => {
  const { input: { value, onChange }, helpText, options, classes } = props
  const valueIndex = options.indexOf(value)
  return <FormControl fullWidth className={classes.selectFormControl}>
      <InputLabel htmlFor='simple-select' className={classes.selectLabel}>
        {helpText}
      </InputLabel>
      <Select
        MenuProps={{ className: classes.selectMenu }}
        classes={{ select: classes.select }}
        value={valueIndex >= 0 ? valueIndex : 0}
        onChange={e => onChange(options[e.target.value])}
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

const BusinessLocationFieldForm = props => {
  const { input: { value, onChange }, ...others } = props
  return <BusinessLocationField value={value} onChange={onChange} {...others} />
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

        <Grid item xs={12} sm={12} md={3}>
          <Field
            name='email'
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

        <Grid item xs={12} sm={12} md={4}>
          <Field
            name='website'
            component={CustomInput}
            labelText={<span>Website</span>}
            formControlProps={{ fullWidth: true }}
            inputProps={{
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Web className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <Field
            name='phone'
            component={CustomInput}
            labelText={<span>Phone</span>}
            formControlProps={{ fullWidth: true }}
            inputProps={{
              endAdornment: (
                <InputAdornment position='end' className={classes.inputAdornment}>
                  <Phone className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={10}>
          <Field
            name='description'
            component={CustomInput}
            labelText='A brief description of your business.'
            formControlProps={{ fullWidth: true }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={10}>
          <Field
            name='businesslocation'
            component={BusinessLocationFieldForm}
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

const validate = (profile, props) => {
  const preparedProfile = {
    type: props.userType,
    ...profile
  }
  // Here we use backend code to perform frontend validation. How cool is that?
  return validateProfile(preparedProfile) || {}
}

export default compose(
  withStyles(style),
  reduxForm({
    form: 'profile',
    validate
  })
)(ProfileForm)