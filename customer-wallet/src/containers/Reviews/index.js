import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'

import yelpData from './test-data/yelp.json'
import tripAdvisorData from './test-data/tripadvisor.json'
import upworkData from './test-data/upwork.json'

import Review from './components/Review'

import { map } from 'lodash'

const styles = {
    root: {
        padding: '20px',
        flexGrow: 1
    },
}

class Reviews extends Component {

    transformYelpData() {
        return map(yelpData, (review) => {
            return {
                subject: {
                    name: review.name,
                    address: review.address,
                    telephone: null,
                    categories: review.types,
                    location: {
                        lat: review.latitude,
                        lng: review.longitude
                    },
                    url: review.webpage,
                },
                platform: {
                    name: 'yelp',
                    url: 'yelp.com',
                    subject_url: review.url
                },
                author: {
                    name: review.author,
                },
                review: {
                    date_published: review.datePublished,
                    url: review.rev_url,
                    title: null,
                    text: review.description
                },
                rating: {
                    min: 1,
                    value: review.ratingValue,
                    max: 5,
                },
                verifiable: false,
                proof: null
            }
        })
    }

    transformTripAdvisorData() {
        return map(tripAdvisorData, (review) => {
            return {
                subject: {
                    name: review.name,
                    address: `${review.street}, ${review.city} ${review.postal}, ${review.country}`,
                    telephone: review.telephone,
                    categories: [review.type, review.subtype],
                    location: null,
                    url: review.url,
                    platform_url: review.restaurant_url,                    
                },
                platform: {
                    name: 'TripAdvisor',
                    url: 'tripadvisor.com',
                    subject_url: review.url
                },
                author: {
                    name: review.author,
                },
                review: {
                    date_published: review.date,
                    url: review.rev_url,
                    title: review.title,
                    text: review.text
                },
                rating: {
                    min: 1,
                    value: review.score,
                    max: 5,
                }
            }
        })
    }

    transformUpworkData() {
        return map(upworkData, (review) => {
            let detailedReview = map(review.feedback.scoreDetails, (detail) => {
                return {
                    rating: {
                        min: 0,
                        value: detail.score,
                        max: 5,
                    },
                    review: detail.description,
                    category: detail.label
                }
            })
            return {
                subject: {
                    name: review.agencyName,
                    categories: review.skills,
                },
                platform: {
                    name: 'Upwork',
                    url: 'upwork.com',
                },
                author: {
                    name: review.clientId,
                },
                review: {
                    text: review.feedback.comment
                },
                rating: {
                    min: 1,
                    value: review.feedback.score,
                    max: 5,
                },
                detailedReview
            }
        })
    }

    renderReviews(reviews, classes) {
        return <Grid container spacing={16} className={classes.root}>
            {reviews.map((review, index) => (
                 <Grid key={index} item xs={12} lg={6} > 
                     <Review review={review} index={index + 1} />
                 </Grid>
             ))}
        </Grid>
    }
    
    render() {
        const upworkReviews = this.transformUpworkData()
        const yelpReviews = this.transformYelpData()
        const tripAdvisorReviews = this.transformTripAdvisorData()
        const { classes } = this.props
        return (
            <div>
                <h4>UpWork</h4>
                {this.renderReviews(upworkReviews, classes)}
                <h4>Yelp</h4>
                {this.renderReviews(yelpReviews, classes)}
                <h4>Trip Advisor</h4>
                {this.renderReviews(tripAdvisorReviews, classes)}
            </div>
        )
    }
}

export default withStyles(styles)(Reviews);
