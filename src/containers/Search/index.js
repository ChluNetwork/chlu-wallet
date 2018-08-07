import React, { Component } from 'react'
// components
import { Card, CardContent, CardHeader, Divider, Grid, withStyles } from '@material-ui/core'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import Select from 'react-select';

import { emphasize } from '@material-ui/core/styles/colorManipulator';

// icons
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
  },
  root: {
    flexGrow: 1,
    height: 250,
  },
});

const options = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
].map(option => ({
  value: option.label,
  label: option.label,
}));


class Search extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    toggle: true,
  };

  handleToggle = (event, checked) => {
    this.setState({ toggle: checked });
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };


  render () {

    const { toggle } = this.state;
    const { classes } = this.props;

    return <Card className={classes.card}>
        <CardHeader
            subheader='Find People or Busineses to Pay, Review & Earn Chlu'
        />
        <Divider/>
        <CardContent>
          <FormGroup>
            <Grid container justify='center' spacing={12}>
              <Grid item xs={12} sm={12} md={2}>
                <FormControlLabel
                  control={
                    <Switch checked={toggle} onChange={this.handleToggle} aria-label="ProfileSwitch" />
                  }
                  label={toggle ? 'Businesses' : 'Individuals'}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} justify='center'>
                <div className={classes.root}>
                  <NoSsr>
                    <Select
                      classes={classes}
                      options={options}
                      placeholder="Business Type"
                    />
                    </NoSsr>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} justify='center'>
                <TextField
                  id="search"
                  label="Search text"
                  type="search"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Button variant="fab" color="primary" aria-label="Search" className={classes.button}>
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>
            </FormGroup>

        </CardContent>
      </Card>
  }
}

export default withStyles(styles)(Search);
