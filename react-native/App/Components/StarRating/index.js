import React from 'react'
// rn-components
import { View } from 'react-native'
// component
import StarRating from 'react-native-star-rating'
// styles
import styles from '../Styles/StarRatingStyles'

const StarRatingComponent = (props) => (
  <View style={styles.wrapper}>
    <StarRating
      {...props}
      fullStar={'ios-star'}
      emptyStar={'ios-star'}
      iconSet={'Ionicons'}
    />
  </View>
)

export default StarRatingComponent
