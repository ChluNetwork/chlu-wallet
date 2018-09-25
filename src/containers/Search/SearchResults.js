import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import replace from 'helpers/replace'

import { ITEMS_PER_PAGE } from 'store/modules/data/search'
import { LinearProgress } from '@material-ui/core';

const businessesColumnData = [
  { id: 'logo', numeric: false, disablePadding: true, label: 'Logo' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
  { id: 'location', numeric: false, disablePadding: true, label: 'Location' },
  { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
  { id: 'averagescore', numeric: true, disablePadding: false, label: 'Reviews' },
];

const individualsColumnData = [
  { id: 'pic', numeric: false, disablePadding: true, label: 'Picture' },
  { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
  { id: 'first', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'last', numeric: false, disablePadding: true, label: 'Last Name' },
  { id: 'location', numeric: false, disablePadding: true, label: 'Location' },
  { id: 'averagescore', numeric: true, disablePadding: false, label: 'Reviews' },
];

const SearchResultsHead = ({ type }) => {
  const isBusiness = type === 'businesses'
  const columnData = isBusiness ? businessesColumnData : individualsColumnData
  return (
    <TableHead>
      <TableRow>
        {columnData.map(column => {
          return (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding={'default'}
              sortDirection={false}
            >
              {column.label}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    flexDirection: 'column',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

class SearchResults extends React.Component {

  handleChangePage = (event, page) => {
    this.props.setPage(page);
  };

  render() {
    const { classes, type, data, count, page, loading, error } = this.props;
    const emptyRows = ITEMS_PER_PAGE - data.length

    return (
      <Paper className={classes.root}>
        <h3>Search Results</h3>
        {error ? 'Something went wrong' : ''}
        {loading && !error && <div><LinearProgress /></div>}
        {!loading && !error && <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle'>
            <SearchResultsHead type={type} />
            <TableBody>
              {data
                .map(vendor => {
                  const n = vendor.profile
                  return (
                      <TableRow
                        hover
                        onClick={() => replace('/profile/' + vendor.vDidId)}
                        style={{ cursor: 'pointer' }}
                        role='checkbox'
                        aria-checked={false}
                        tabIndex={-1}
                        key={vendor.vDidId}
                      >
                        <TableCell component='th' scope='row' padding='none'>
                          <Avatar
                            alt='Bob Smith'
                            src={require('images/default-avatar.png')}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                          />
                        </TableCell>
                        <TableCell>{n.businessname || n.username}</TableCell>
                        <TableCell>{n.businessdescription || n.firstname}</TableCell>
                        <TableCell>{n.businesslocation || n.lastname}</TableCell>
                        <TableCell>{n.businesstype || n.location}</TableCell>
                        <TableCell numeric>{n.averagescore}</TableCell>
                      </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div> }
        {!error && !loading && <TablePagination
          component='div'
          count={count}
          rowsPerPage={ITEMS_PER_PAGE}
          rowsPerPageOptions={[ITEMS_PER_PAGE]}
          page={page}
          onChangePage={this.handleChangePage}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
        />}
      </Paper>
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResults);
