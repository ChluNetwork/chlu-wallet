import React from 'react'
import PropTypes from 'prop-types'
// components
import ReviewTitle from './ReviewTitle'
// data
import noProduct from 'images/no-product.png'
// helpers
import Date from 'helpers/Date'
// styles
import './style.css'

const ReviewItem = ({
  isMultipleReview,
  commentsList,
  comment,
  date,
  price,
  rating,
  review,
  platform,
  productPhoto
}) => {

  return (
    <div className='review-item container-border-bottom'>
      <div className='review-item__avatar'>
        <img src={productPhoto || noProduct} alt='avatar' className='avatar'/>
      </div>
      <div className='review-item__info'>
        <div className='info-head-wrapper'>
          <div className='info-head'>
            <div className='info-head__name'>{review}</div>
            <div className='info-head__date color-light'>
              {isMultipleReview || <div className='date'>{date}</div>}
              <div className='platform'>{platform}</div>
            </div>
          </div>
          {
            isMultipleReview ||
            <div className='info-head__price'>
              <div className='price-item'>{price} BTC</div>
              <div className='price-item'>{price} USD</div>
            </div>
          }
        </div>
        <div className='review-comments__list'>
          {
            isMultipleReview
              ? commentsList.map((comment, index) => {
                const parseDate = new Date(comment.date)
                const parseComment = {
                  ...comment,
                  date: `${parseDate.getMonthName()} ${parseDate.getDay()}, ${parseDate.getFullYear()}`
                }

                return <ReviewTitle {...parseComment} key={index}/>
              })
              : <ReviewTitle rating={rating} comment={comment}/>
          }
        </div>
      </div>
    </div>
  )
}

ReviewItem.propTypes = {
  isMultipleReview: PropTypes.bool,
  commentsList: PropTypes.array,
  comment: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  review: PropTypes.string,
  platform: PropTypes.string,
  productPhoto: PropTypes.string
}

ReviewItem.defaultProps = {
  commentsList: []
}

export default ReviewItem
