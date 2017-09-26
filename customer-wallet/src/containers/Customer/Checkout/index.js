import React, { Component } from 'react'
import PropTypes from 'prop-types'
// redux
import { connect } from 'react-redux'
import { actions } from 'shared-libraries/lib'
// components
import HeaderSection from './sections/HeaderSection'
import PaySection from './sections/PaySection'
import ProductSection from './sections/ProductSection'
import CircularProgress from 'material-ui/CircularProgress'
// styles
import './styles.css'
// constants
const { dataActions: { checkout: { getCheckout } } } = actions

class Checkout extends Component {
  componentDidMount() {
    const { getCheckout } = this.props

    getCheckout()
  }

  render() {
    const { checkout: {
      loading,
      data: { name, rating, title, avatar, price, operation }
    } } = this.props

    return (
      <div className='page-container checkout'>
        <h3>Checkout at Etsy</h3>
        {
          loading
            ? <CircularProgress />
            : <div className='checkout-vendor'>
              <HeaderSection name={name} rating={rating} />
              <span className='checkout-vendor__header-info'>({title})</span>
              <ProductSection avatar={avatar} price={price} operation={operation} />
              <PaySection />
            </div>
        }
      </div>
    )
  }
}

Checkout.propTypes = {
  checkout: PropTypes.object.isRequired,
  getCheckout: PropTypes.func.isRequired
}

const maoStateToProps = store => ({
  checkout: store.data.checkout
})

const mapDispatchToProps = {
  getCheckout
}

export default connect(maoStateToProps, mapDispatchToProps)(Checkout)
