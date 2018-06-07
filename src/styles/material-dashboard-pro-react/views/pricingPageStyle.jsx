// ##############################
// // // PricingPage Pages View styles
// #############################

import {
  container,
  defaultFont
} from 'styles/material-dashboard-pro-react'

const pricingPageStyle = {
  content: {
    minHeight: "calc(100vh - 80px)",
    position: "relative",
    zIndex: "4"
  },
  container: {
    ...container
  },
  title: {
    ...defaultFont,
    color: "#FFFFFF",
    marginTop: "13vh",
    marginBottom: "30px",
    textAlign: "center"
  },
  description: {
    fontSize: "18px",
    color: "#FFFFFF",
    textAlign: "center"
  }
};

export default pricingPageStyle;
