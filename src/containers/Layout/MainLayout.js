import React, { Component } from 'react'
import { any } from 'prop-types'
// libs
import ReduxToastr from 'react-redux-toastr'
// toastr
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
// styles
import CssBaseline from '@material-ui/core/CssBaseline'
import ChluLayout from './ChluLayout'

class MainLayout extends Component {
  static propTypes = {
    children: any,
  }

  render () {
    const { children } = this.props

    return (
      <CssBaseline>
        <ChluLayout>{children}</ChluLayout>
        <ReduxToastr
          timeOut={5000}
          preventDuplicates
          position='top-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          newestOnTop
        />
      </CssBaseline>
    )
  }
}

export default MainLayout
