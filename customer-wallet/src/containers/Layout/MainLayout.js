import React, { Component } from 'react'
import { any, object } from 'prop-types'
// libs
import ReduxToastr from 'react-redux-toastr'
// toastr
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
// styles
import './style.css'

class MainLayout extends Component {
  static propTypes = {
    children: any,
  }

  render () {
    const { children } = this.props

    return (
      <div>
        {children}
        <ReduxToastr
          timeOut={5000}
          preventDuplicates
          position='top-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          newestOnTop
        />
      </div>
    )
  }
}

export default MainLayout
