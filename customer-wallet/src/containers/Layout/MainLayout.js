import React from 'react'
import { any } from 'prop-types'
// libs
import ReduxToastr from 'react-redux-toastr'

const MainLayout = ({ children }) => (
  <div>
    {children}
    <ReduxToastr
      timeOut={4000}
      preventDuplicates
      position='top-right'
      transitionIn='fadeIn'
      transitionOut='fadeOut'
      newestOnTop
    />
  </div>
)

MainLayout.propTypes = {
  children: any,
}

export default MainLayout
