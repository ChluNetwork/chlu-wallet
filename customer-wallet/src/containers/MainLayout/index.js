import React from 'react'
// components
import AppBar from 'material-ui/AppBar'

const MainLayout = ({ children }) => (
  <div>
    <AppBar
      title='Chlu'
      iconClassNameRight='muidocs-icon-navigation-expand-more'
    />
    {children}
  </div>
)

export default MainLayout
