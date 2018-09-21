import React, { Component } from 'react'
// Material Components
import { withStyles, Card, CardContent, CardHeader, CardActionArea } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// Components
import StarRatingComponent from 'react-star-rating-component'
import EditReview from 'components/EditReview'
// Icons
import LinkIcon from '@material-ui/icons/Link'
import CommentIcon from '@material-ui/icons/Comment'
import PlatformIcon from '@material-ui/icons/Store'
import VerifiableIcon from '@material-ui/icons/VerifiedUser'
import TokenIcon from '@material-ui/icons/PlusOne'
import ViewMoreIcon from '@material-ui/icons/OpenInNew'
// Redux
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// Assets
import defaultImage from 'images/default-avatar.png'
// Helpers
import { isArray, isNil, get, isEmpty } from 'lodash'
import { Divider } from '@material-ui/core';

const starCount = 5
class Review extends Component {

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

  addHttp(url) {
    if (!/^(?:f|ht)tps?:\/\//.test(url)) {
      url = "http://" + url;
    }
    return url;
  }

  openReview = () => this.props.push(`/review/${this.props.review.multihash}`)

  openAuthorProfile = () => {
    const { review } = this.props
    const authorDid = review.author.did || get(review, 'customer_signature.creator')
    if (authorDid) this.props.push(`/profile/${authorDid}`)
  }

  openSubjectProfile = () => {
    const { review } = this.props
    const subjectDid = review.subject.did || get(review, 'popr.vendor_did')
    if (subjectDid) this.props.push(`/profile/${subjectDid}`)
  }

  render() {
    const {
      classes,
      review,
      detailed = false,
      showSubjectInfo = false,
      showAuthorInfo = true
    } = this.props
    // Author
    const authorDid = review.author.did
      || get(review, 'customer_signature.creator', 'Anonymous')
    const isAuthorKnown = !isEmpty(authorDid)
    const authorName = get(review, 'author.profile.name')
      || review.author.name
      || authorDid
    const avatarDataUrl = get(review, 'author.profile.avatarDataUrl', defaultImage)
    // Subject
    const isSubjectKnown = !isEmpty(get(review, 'subject.profile'))
    const subjectDid = review.subject.did
      || get(review, 'popr.vendor_did', 'Unknown')
    const subjectName = get(review, 'subject.profile.name')
      || get(review, 'subject.profile.businessname')
      || get(review, 'subject.profile.username')
      || subjectDid
    const subjectAvatarDataUrl = get(review, 'subject.profile.avatarDataUrl', defaultImage)
    // Content (Text)
    const contentTitle = get(review, 'review.title', '')
    const contentText = get(review, 'review.text', '')
    const contentPrimary = contentTitle || contentText
    const contentSecondary = contentText && contentTitle ? contentText : ''
    // Content (Rating)
    let max = parseInt(get(review, 'rating_details.max', starCount), 10)
    if (isNaN(max) || max < 1) max = starCount
    const rating = get(review, 'rating_details.value', 0)
    return (
      <Card>
        { isSubjectKnown && showSubjectInfo && <CardActionArea className={classes.fullWidth} onClick={this.openSubjectProfile}>
          <CardHeader
            avatar={<Avatar alt='subject' src={subjectAvatarDataUrl}>V</Avatar>}
            title={subjectName}
            subheader='Received this Review'
          />
        </CardActionArea> }
        { isSubjectKnown && showSubjectInfo && isAuthorKnown && showAuthorInfo && <Divider/> }
        <CardActionArea className={classes.fullWidth} onClick={this.openAuthorProfile}>
          <CardHeader
            avatar={<Avatar alt='author' src={avatarDataUrl}>A</Avatar>}
            title={
              <div>
                <StarRatingComponent
                  name='rating'
                  starCount={max}
                  value={rating}
                  editing={false}
                /> {contentPrimary}
              </div>
            }
            subheader={`By ${authorName}`}
          />
        </CardActionArea>
        {review.review && <CardContent>
          <List disablePadding>
            { contentSecondary && <ListItem>
              <ListItemIcon><CommentIcon/></ListItemIcon>
              <ListItemText
                primary={contentSecondary}
              />
            </ListItem> }
            { this.detailedReview(review.detailed_review) }
            { review.editable && <ListItem>
              <ListItemIcon><TokenIcon/></ListItemIcon>
              <ListItemText
                primary='Chlu Token Eligible'
                secondary='This Review you will award you Chlu Tokens'
              />
            </ListItem> }
            { !detailed && <ListItem button onClick={this.openReview}>
              <ListItemIcon><ViewMoreIcon/></ListItemIcon>
              <ListItemText
                primary='View More'
                secondary='Click here to view detailed information or edit this review'
              />
            </ListItem> }
            { detailed && this.renderDetails() }
          </List>
        </CardContent>}
        {detailed && review.editable && <EditReview multihash={review.multihash}/>}
      </Card>
    )
  }

  renderDetails() {
    const { review } = this.props
    return (<div>
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
          primary='Verified'
          secondary={isNil(review.verifiable) || !review.verifiable ? 'No' : 'Yes, this review is payment backed'}
        />
      </ListItem>
    </div>)
  }
}

const mapDispatchToProps = {
  push
}

const styles = {
  fullWidth: {
    width: '100%'
  }
}

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(Review)
