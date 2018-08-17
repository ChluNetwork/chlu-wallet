import React, { Component } from 'react'
// components
import { Card, CardContent, Divider, Grid, withStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import Star from '@material-ui/icons/Star';
import Add from '@material-ui/icons/Add';

import BusinessSearchResults from './BusinessSearchResults';
import IndividualSearchResults from './IndividualSearchResults';

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

const ratings = [
  { label: 'Any' },
  { label: <div><Star /><Star /><Star /><Star /><Star /></div> },
  { label: <div><Star /><Star /><Star /><Star /><Add /></div> },
  { label: <div><Star /><Star /><Star /><Add /></div> },
  { label: <div><Star /><Star /><Add /></div> },
  { label: <div><Star /><Add /></div> },
].map(option => ({
  value: option.label,
  label: option.label,
}));

const categories = [
  { label: 'Accountant' },
  { label: 'Advertising' },
  { label: 'Restaurant' },
  { label: 'Etc' },
].map(option => ({
  value: option.label,
  label: option.label,
}));

const locations = [
  { label: 'Europe' },
  { label: 'US' },
  { label: 'Asia' },
  { label: 'Etc' },
].map(option => ({
  value: option.label,
  label: option.label,
}));

function TabContainer(props) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      searchName: '',
      actType: 'individual'
    }
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render () {

    const { value } = this.state;
    const { classes } = this.props;

    return <Card className={classes.card}>
        <Divider/>
        <CardContent>

        {value === 0 && <TabContainer>
            <Grid container justify='space-evenly' alignItems='flex-end' spacing={16} className={classes.searchGrid}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant='headline' align='center'>
                  Search for businesses to pay and review
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  id='search'
                  label='Name'
                  type='search'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={categories}
                  placeholder='Business Type'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={locations}
                  placeholder='Location'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={ratings}
                  placeholder='Rating'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Button variant='contained' color='secondary' className={classes.button}>
                  Search <SearchIcon className={classes.rightIcon} />
                </Button>
              </Grid>
            </Grid>
          </TabContainer>}
        {value === 1 && <TabContainer>
            <Grid container justify='space-evenly' alignItems='flex-end' spacing={16} className={classes.searchGrid}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant='headline' align='center'>
                  Search for people to pay and review
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <TextField
                  id='search'
                  label='Name'
                  type='search'
                  value={this.state.searchName}
                  onChange={(e) => this.setState({ searchName: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={locations}
                  placeholder='Location'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Button variant='contained' color='secondary' className={classes.button}>
                  Search <SearchIcon className={classes.rightIcon} />
                </Button>
              </Grid>
            </Grid>
          </TabContainer>}


          <Tabs
            value={this.state.value}
            onChange={this.handleTabChange}
            fullWidth
            indicatorColor='secondary'
            textColor='secondary'
            centered
          >
            <Tab icon={<BusinessIcon />} label='Businesses' />
            <Tab icon={<AccountCircleIcon />} label='People' />
          </Tabs>
        <Divider/>
          {this.state.value === 0 ? <BusinessSearchResults searchName={this.state.searchName} /> : <IndividualSearchResults searchName={this.state.searchName} />}
        </CardContent>
      </Card>
  }
}

export default withStyles(styles)(Search);
