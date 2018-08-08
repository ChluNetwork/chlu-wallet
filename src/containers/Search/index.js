import React, { Component } from 'react'
// components
import { Card, CardContent, CardHeader, Divider, Grid, withStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';

import EnhancedTable from './EnhancedTable';

import { emphasize } from '@material-ui/core/styles/colorManipulator';

// icons
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
  searchGrid: {
    backgroundColor: 'rgba(200, 200, 200, .2)'
  },
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

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Search extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: 0,
  };

  handleMenuChange = (event, value) => {
    this.setState({ value });
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render () {

    const { value, toggle } = this.state;
    const { classes } = this.props;

    return <Card className={classes.card}>
        <Divider/>
        <CardContent>

        {value === 0 && <TabContainer>
            <Grid container justify="space-evenly" alignItems="flex-end" spacing={16} className={classes.searchGrid}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="headline" align="center">
                  Search for people to pay and review
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={options}
                  placeholder="Location"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  id="search"
                  label="Name"
                  type="search"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Button variant="contained" color="secondary" className={classes.button}>
                  Search <SearchIcon className={classes.rightIcon} />
                </Button>
              </Grid>
            </Grid>
          </TabContainer>}
        {value === 1 && <TabContainer>
            <Grid container justify="space-evenly" alignItems="flex-end" spacing={16} className={classes.searchGrid}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="headline" align="center">
                  Search for businesses to pay and review
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={options}
                  placeholder="Business Type"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={options}
                  placeholder="Location"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  id="search"
                  label="Name"
                  type="search"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Button variant="contained" color="secondary" className={classes.button}>
                  Search <SearchIcon className={classes.rightIcon} />
                </Button>
              </Grid>
            </Grid>
          </TabContainer>}

          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            fullWidth
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab icon={<AccountCircleIcon />} label="People" />
            <Tab icon={<BusinessIcon />} label="Businesses" />
          </Tabs>

        <Divider/>
          <EnhancedTable/>
        </CardContent>
      </Card>
  }
}

export default withStyles(styles)(Search);
