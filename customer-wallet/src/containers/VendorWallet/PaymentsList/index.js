import React from 'react'
//components
import PaymentItem from './PaymentItem'

const PaymentsList = () => (
  <div className='payments-list'>
    <div className='period'>September 2017</div>
    <PaymentItem />
    <PaymentItem />
    <div className='period'>August 2017</div>
  </div>
)

export default PaymentsList
