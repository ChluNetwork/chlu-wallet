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
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import replace from 'helpers/replace'

import { itemsPerPage } from 'store/modules/data/search'

const columnData = [
  { id: 'logo', numeric: false, disablePadding: true, label: 'Logo' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
  { id: 'location', numeric: false, disablePadding: true, label: 'Location' },
  { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
  { id: 'averagescore', numeric: true, disablePadding: false, label: 'Reviews' },
];

class BusinessSearchResultsHead extends React.Component {
  render() {
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

class BusinessSearchResults extends React.Component {

  handleChangePage = (event, page) => {
    this.props.setPage(page);
  };

  render() {
    const { classes, data, count, page } = this.props;
    const emptyRows = itemsPerPage - data.length

    return (
      <Paper className={classes.root}>
        <h3>Search Results</h3>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle'>
            <BusinessSearchResultsHead />
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
                        <TableCell>{n.businessname}</TableCell>
                        <TableCell>{n.businessdescription}</TableCell>
                        <TableCell>{n.businesslocation}</TableCell>
                        <TableCell>{n.businesstype}</TableCell>
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
        </div>
        <TablePagination
          component='div'
          count={count}
          rowsPerPage={itemsPerPage}
          rowsPerPageOptions={[itemsPerPage]}
          page={page}
          onChangePage={this.handleChangePage}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
        />
      </Paper>
    );
  }
}

BusinessSearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BusinessSearchResults);
