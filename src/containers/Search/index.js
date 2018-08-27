import React, { Component } from 'react'
import { get, isEmpty } from 'lodash'

// components
import { Card, CardContent, Divider, Grid, withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BusinessSearchResults from './BusinessSearchResults';
import IndividualSearchResults from './IndividualSearchResults';

// icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import SearchIcon from '@material-ui/icons/Search';
import Star from '@material-ui/icons/Star';
import Add from '@material-ui/icons/Add';

// redux
import { search, setQuery } from 'store/modules/data/search'
import { compose } from 'recompose'
import { connect } from 'react-redux'

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
  { label: 'Other' },
].map(option => ({
  value: option.label,
  label: option.label,
}));

const locations = [
  { label: 'Europe' },
  { label: 'US' },
  { label: 'Asia' },
  { label: 'Earth' },
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
    const type = 'businesses'
    this.state = {
      type
    }
    this.setName = this.setQueryField('name')
    this.setBusinessType = this.setQueryField('businesstype')
    this.setLocation = this.setQueryField('location')
    this.setType = this.setQueryField('type')
    this.setType(type === 'businesses' ? 'business' : 'individual')
  }

  componentDidMount() {
    this.props.search()
  }

  handleTabChange = (event, value) => {
    const type = value ? 'individuals' : 'businesses'
    this.setState({ type });
    this.setType(type === 'businesses' ? 'business' : 'individual')
  };

  setQueryField = field => event => {
    const value = get(event, 'target.value', event)
    const query = this.props.query || {}
    const preparedValue = get(value, 'value', value)
    query[field] = isEmpty(preparedValue) ? undefined : preparedValue
    this.props.setQuery(query)
  }

  render () {

    const { type } = this.state;
    const { classes, search, query, page, results } = this.props

    const SearchComponent = type === 'businesses' ? BusinessSearchResults : IndividualSearchResults

    return <Card className={classes.card}>
        <CardContent>

        {type === 'individuals' && <TabContainer>
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
                  value={get(query, 'name')}
                  onChange={this.setName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={categories}
                  placeholder='Business Type'
                  value={get(query, 'businesstype')}
                  onChange={this.setBusinessType}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={locations}
                  placeholder='Location'
                  value={get(query, 'location')}
                  onChange={this.setLocation}
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
                <Button variant='contained' color='secondary' className={classes.button} onClick={search}>
                  Search <SearchIcon className={classes.rightIcon} />
                </Button>
              </Grid>
            </Grid>
          </TabContainer>}
        {type === 'businesses' && <TabContainer>
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
                  value={get(query, 'name')}
                  onChange={this.setName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={locations}
                  value={get(query, 'location')}
                  onChange={this.setLocation}
                  placeholder='Location'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Button variant='contained' color='secondary' className={classes.button} onClick={search}>
                  Search <SearchIcon className={classes.rightIcon} />
                </Button>
              </Grid>
            </Grid>
          </TabContainer>}


          <Tabs
            value={type === 'businesses' ? 0 : 1}
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
          <SearchComponent
            page={page}
            data={get(results, 'rows', [])}
            count={get(results, 'count', 0)}
          /> 
        </CardContent>
      </Card>
  }
}

const mapStateToProps = state => ({
  loading: state.data.search.loading,
  error: state.data.search.loading,
  page: state.data.search.page,
  pages: state.data.search.pages,
  results: state.data.search.results
})

const mapDispatchToProps = {
  search,
  setQuery
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Search);
