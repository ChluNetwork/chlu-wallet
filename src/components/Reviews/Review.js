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

import { isArray, isNil, get } from 'lodash'

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
    if (isArray(detailed_review)) {
      return detailed_review
        .filter(dr => Boolean(dr && dr.rating))
        .map(dr => (      
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

  platform(review) {
    if (review.platform && review.platform.name && review.platform.url) {
      return <span>
            Review Origin: <a href={this.addHttp(review.platform.url)} target='_blank'>{review.platform.name} </a>
      </span>
    } else {
      return 'Review Origin: unknown'
    }
  }

  reviewUrl(review) {
    if (review.url) {
      return <span>
        Review link: <a href={this.addHttp(review.review.url)} target='_blank'>{this.addHttp(review.review.url)} </a>
      </span>
    } else {
      return 'Review link: No url available'
    }
  }

  addHttp(url) {
    if (!/^(?:f|ht)tps?:\/\//.test(url)) {
      url = "http://" + url;
    }
    return url;
  }
  
  render() {
    const { review, index } = this.props
    return (
      <Card>
        <CardHeader
          avatar={<Avatar aria-label='review-author'> {index} </Avatar>}
          title={
            <StarRatingComponent
              name='rating'
              starCount={review.rating ? review.rating.max : 5}
              value={review.rating? review.rating.value : 0}
            />
          }
          subheader={isNil(get(review, 'author.name')) ? 'Anonymous' : review.author.name }
        />
        {review.review && <CardContent>
          <List disablePadding>
            <ListItem>
              <ListItemText
                  primary={review.review.title || 'No title provided'}
                  secondary={review.review.text || 'No review provided'}
              />
            </ListItem>
            {this.datePublished(review.review.date_published)}
            {this.url(review.review.url)}
            {this.detailedReview(review.detailed_review)}
            <ListItem>
              <ListItemText
                  primary={this.platform(review)}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                  primary={`Verifiable: ${(isNil(review.verifiable) || !review.verifiable ? 'No' : 'Yes' )}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                  primary={this.reviewUrl(review)}
              />
            </ListItem>
          </List>
        </CardContent>}
      </Card>
    )
  }  
}

export default Review
