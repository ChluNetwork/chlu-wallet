import { map, get } from 'lodash'

export function transformYelpData(yelpData) {
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

export function transformTripAdvisorData(tripAdvisorData) {
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

export function transformUpworkData(upworkData) {
  console.log('transform upwork data')
  console.log(upworkData)
  const results = map(upworkData, (review) => {
    const scoreDetails = get(review, 'feedback.scoreDetails', [])
    const detailed_review = map(scoreDetails, detail => {
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
        text: get(review, 'feedback.comment', null)
      },
      rating: {
        min: 1,
        value: get(review, 'feedback.score', null),
        max: 5,
      },
      detailed_review
    }
  })
  console.log(results)
  return results
}