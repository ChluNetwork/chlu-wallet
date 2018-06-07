import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import DateRangeIcon from '@material-ui/icons/DateRange'
import LinkIcon from '@material-ui/icons/Link'

import { isArray } from 'lodash'

class Review extends Component {
  
  datePublished(datePublished) {
    if (datePublished) {
      return (
        <ListItem>
            <ListItemIcon><DateRangeIcon /></ListItemIcon>
            <ListItemText
                primary={datePublished}
            />
        </ListItem>
      )
    }
  }
  
  url(url) {
    if(url) {
      return (
        <ListItem>
            <ListItemIcon><LinkIcon /></ListItemIcon>
            <ListItemText
                primary={<a href={url}>{url}</a>}
            />
        </ListItem>
      )
    }
  }

  detailedReview(detailed_review) {
    if ( isArray(detailed_review) ) {
      return detailed_review.map((dr) => (      
        <ListItem>
          <ListItemText
              primary={
                <div>
                  <div>{dr.category}</div>
                  <div>
                    <StarRatingComponent name='rating' starCount={dr.rating.max} value={dr.rating.value} />
                  </div>
                </div>}
              secondary={dr.review}
          />
        </ListItem>
      ))
    }
  }
  
  render() {
    const { review, index } = this.props
    return (
      <Card>
          <CardHeader
              avatar={<Avatar aria-label='review-author'> {index} </Avatar>}
              title={<StarRatingComponent name='rating' starCount={review.rating.max} value={review.rating.value} />}
              subheader={review.author.name}
          />
          <CardContent>
            <List disablePadding>
              <ListItem>
                <ListItemText
                    primary={review.review.title}
                    secondary={review.review.text}
                />
              </ListItem>
              {this.datePublished(review.review.date_published)}
              {this.url(review.review.url)}
              {this.detailedReview(review.detailed_review)}
            </List>
          </CardContent>
      </Card>
    )
  }  
}

export default Review
