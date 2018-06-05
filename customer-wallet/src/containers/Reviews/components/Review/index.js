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
import TextIcon from '@material-ui/icons/ShortText'


class Review extends Component {
  
  render() {
    const { review, index } = this.props
    return (
        <Card>
        <CardHeader
      avatar={<Avatar aria-label='review-author'>
              {index}
              </Avatar>
             }
      title={<StarRatingComponent
             name='rating'
             starCount={review.rating.max}
             value={review.rating.value}
             />
            }
      subheader={review.author.name}
        />
              <CardContent>
                  <List dense disablePadding>
                      <ListItem>
                          <ListItemText
                              primary={review.review.title}
                              secondary={review.review.text}
                          />
                      </ListItem>                      
                      <ListItem>
                          <ListItemIcon><DateRangeIcon /></ListItemIcon>
                          <ListItemText
                              primary={review.review.date_published}
                          />
                      </ListItem>
                      <ListItem>
                          <ListItemIcon><LinkIcon /></ListItemIcon>
                          <ListItemText
                              primary={<a href={review.review.url}>{review.review.url}</a>}
                          />
                      </ListItem>
                  </List>
              </CardContent>
        </Card>
    )
  }  
}

export default Review
