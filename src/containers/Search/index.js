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

import SearchResults from './SearchResults';

// icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BusinessIcon from '@material-ui/icons/Business';
import SearchIcon from '@material-ui/icons/Search';
import Star from '@material-ui/icons/Star';
import Add from '@material-ui/icons/Add';

// redux
import { search, setQuery, setPage } from 'store/modules/data/search'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

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

function selectFieldValue(val) {
  return val ? { label: val, value: val } : null
}

class Search extends Component {
  constructor(props) {
    super(props);
    const { type } = props
    this.setName = this.setQueryField('name')
    this.setBusinessType = this.setQueryField('businesstype')
    this.setLocation = this.setQueryField('location')
    this.setType = this.setQueryField('type')
    this.props.setQuery({ type: type === 'businesses' ? 'business' : 'individual' })
  }

  componentDidMount() {
    this.props.search()
  }

  componentDidUpdate(prevProps) {
    const { type, setQuery, search } = this.props
    if (prevProps.type !== type) {
      setQuery({ type: type === 'businesses' ? 'business' : 'individual' })
      search()
    }
  }

  handleTabChange = (event, value) => {
    const type = value ? 'individuals' : 'businesses'
    this.props.push(`/search/${type}`)
  };

  setQueryField = field => event => {
    const value = get(event, 'target.value', event)
    const query = this.props.query || {}
    const preparedValue = get(value, 'value', value)
    query[field] = isEmpty(preparedValue) ? undefined : preparedValue
    console.log(field, query[field])
    this.props.setQuery(query)
  }

  setPage = page => {
    this.props.setPage(page)
    this.props.search()
  }

  render () {

    const { classes, type, search, name, location, businesstype, page, results, error, loading } = this.props

    return <Card className={classes.card}>
        <CardContent>

        {type === 'businesses' && <TabContainer>
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
                  value={name}
                  onChange={this.setName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={categories}
                  placeholder='Business Type'
                  value={selectFieldValue(businesstype)}
                  onChange={this.setBusinessType}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={locations}
                  placeholder='Location'
                  value={selectFieldValue(location)}
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
        {type === 'individuals' && <TabContainer>
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
                  value={name}
                  onChange={this.setName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Select
                  classes={classes}
                  options={locations}
                  value={selectFieldValue(location)}
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
          <SearchResults
            type={type}
            page={page}
            data={get(results, 'rows', [])}
            count={get(results, 'count', 0)}
            setPage={this.setPage}
            loading={loading}
            error={error}
          /> 
        </CardContent>
      </Card>
  }
}

const mapStateToProps = state => ({
  loading: state.data.search.loading,
  error: state.data.search.error,
  page: state.data.search.page,
  pages: state.data.search.pages,
  results: state.data.search.results,
  query: state.data.search.query,
  name: get(state, 'data.search.query.name', ''),
  location: get(state, 'data.search.query.location', ''),
  businesstype: get(state, 'data.search.query.businesstype', ''),
})

const mapDispatchToProps = {
  search,
  setQuery,
  setPage,
  push
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Search);
