// ##############################
// // // LoginPage view styles
// #############################

import { container } from 'styles/material-dashboard-pro-react'

const loginPageStyle = {
  content: {
    paddingTop: "18vh",
    minHeight: "calc(100vh - 80px)",
    position: "relative",
    zIndex: "4"
  },
  container,
  customButtonClass: {
    "&,&:focus,&:hover":{
      color: "#FFFFFF",
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  }
};

export default loginPageStyle;
