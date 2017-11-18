import React from 'react'
// rn-components
import { View, Text, Image } from 'react-native'
// other components
import StarRating from '../../../Components/StarRating'
// styles
import styles from '../../Styles/CheckoutStyles'
import { Images, Colors } from '../../../Themes'

const Product = () => (
  <View style={styles.whiteBorderedContainer}>
    <View style={styles.productInfoWrapper}>
      <Text style={styles.productInfoTitle}>
        Apple iPhone 6
      </Text>
      <Text style={styles.productInfoPrice}>
        $414.62
      </Text>
      <StarRating
        starColor={Colors.orange}
        maxStars={5}
        rating={3}
        disabled
      />
    </View>
    <View style={styles.productInfoImageWrapper}>
      <Image
        style={styles.productInfoImage}
        source={Images.iphone}
        resizeMode={'contain'}
      />
    </View>
  </View>
)

export default Product
