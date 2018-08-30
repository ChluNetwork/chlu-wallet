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
import CommentIcon from '@material-ui/icons/Comment'
import PlatformIcon from '@material-ui/icons/Store'
import VerifiableIcon from '@material-ui/icons/VerifiedUser'
import TokenIcon from '@material-ui/icons/PlusOne'
import ViewMoreIcon from '@material-ui/icons/OpenInNew'

import EditReview from 'components/EditReview'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { isArray, isNil, get } from 'lodash'

const starCount = 5
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
                      <StarRatingComponent
                        name='rating'
                        editing={false}
                        starCount={dr.rating.max}
                        value={dr.rating.value}
                      />
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
      return  <a href={this.addHttp(review.platform.url)} target='_blank'>{review.platform.name}</a>
    } else {
      return 'Unknown'
    }
  }

  reviewUrl(review) {
    if (review.url) {
      return <span>
        <a href={this.addHttp(review.review.url)} target='_blank'>{this.addHttp(review.review.url)} </a>
      </span>
    } else {
      return 'Unknown'
    }
  }

  addHttp(url) {
    if (!/^(?:f|ht)tps?:\/\//.test(url)) {
      url = "http://" + url;
    }
    return url;
  }
  
  openReview = () => this.props.push(`/review/${this.props.review.multihash}`)

  render() {
    const {
      review,
      editing = false,
      editingMultihash = null,
      detailed = false
    } = this.props
    const maxStars = get(review, 'rating_details.max', starCount)
    const max = maxStars > 0 ? maxStars : starCount
    const editingThisReview = editing && editingMultihash === review.multihash
    const authorName = review.author.name || review.author.did || review.customer_signature.creator || 'Anonymous'
    return (
      <Card>
        <CardHeader
          avatar={<Avatar aria-label='review-author'>A</Avatar>}
          title={
            <StarRatingComponent
              name='rating'
              starCount={max}
              value={get(review, 'rating_details.value', 0)}
              editing={false}
            />
          }
          subheader={authorName}
        />
        {review.review && <CardContent>
          <List disablePadding>
            <ListItem>
              <ListItemIcon><CommentIcon/></ListItemIcon>
              {!editingThisReview && <ListItemText
                primary={review.review.title || 'No title provided'}
                secondary={review.review.text || 'No review provided'}
              />}
              {detailed && review.editable && (!editing || editingThisReview)
                ? <EditReview multihash={review.multihash} />
                : null
              }
            </ListItem>
            <ListItem>
              <ListItemIcon><PlatformIcon/></ListItemIcon>
              <ListItemText
                primary='Platform'
                secondary={this.platform(review)}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><VerifiableIcon/></ListItemIcon>
              <ListItemText
                primary='Verifiable'
                secondary={isNil(review.verifiable) || !review.verifiable ? 'No' : 'Yes'}
              />
            </ListItem>
            { detailed && <ListItem>
              <ListItemIcon><LinkIcon/></ListItemIcon>
              <ListItemText
                primary='Review Origin'
                secondary={this.reviewUrl(review)}
              />
            </ListItem> }
            { review.editable && <ListItem>
              <ListItemIcon><TokenIcon/></ListItemIcon>
              <ListItemText
                primary='Chlu Token Eligible'
                secondary='This Review you will award you Chlu Tokens'
              />
            </ListItem> }
            { detailed && this.detailedReview(review.detailed_review)}
            { !detailed && <ListItem button onClick={this.openReview}>
              <ListItemIcon><ViewMoreIcon/></ListItemIcon>
              <ListItemText
                primary='View More'
                secondary='Click here to view detailed information or edit this review'
              />
            </ListItem> }
          </List>
        </CardContent>}
      </Card>
    )
  }  
}

const mapStateToProps = state => ({
  editingMultihash: state.data.review.multihash,
  editing: state.data.review.editing
})

const mapDispatchToProps = {
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
