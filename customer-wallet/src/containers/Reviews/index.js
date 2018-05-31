import React, { Component } from 'react'

import yelpData from './test-data/yelp.json'
import tripAdvisorData from './test-data/tripadvisor.json'

import map from 'lodash'

class Reviews extends Component {

    transformYelpData() {
        map(yelpData, (review) => {
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
                    min: 0,
                    value: review.ratingValue,
                    max: 4,
                },
                verifiable: false,
                proof: null
            }
        })
    }

    transformTripAdvisor() {
        map(tripAdvisorData, (review) => {
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
                    min: 0,
                    value: review.score,
                    max: 4,
                }
            }
        })
    }

    transformUpwork() {
        map(tripAdvisorData, (review) => {
            let detailedReview = map(review.feedback.scoreDetails, (detail) => {
                return {
                    rating: {
                        min: 0,
                        value: detail.score,
                        max: 4,
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
                    min: 0,
                    value: review.feedback.score,
                    max: 4,
                },
                detailedReview
            }
        })        
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
  }
}

export default Reviews
