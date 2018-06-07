// ##############################
// // // PricingCard component styles
// #############################

import {
  card,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor
} from 'styles/material-dashboard-pro-react'

const pricingCardStyle = {
  card: {
    ...card,
    textAlign: "center",
    boxShadow:
      "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardContent: {
    padding: "15px 20px !important",
    position: "relative"
  },
  cardTitle: {
    marginBottom: "0",
    marginTop: "10px",
    color: "#000000",
    fontSize: "24px"
  },
  cardPrice: {
    marginTop: "30px",
    marginBottom: "3px",
    color: "#3C4858"
  },
  cardDescription: {
    color: "#000000",
    fontSize: "14px"
  },
  primary: {
    color: primaryColor
  },
  warning: {
    color: warningColor
  },
  danger: {
    color: dangerColor
  },
  success: {
    color: successColor
  },
  info: {
    color: infoColor
  },
  rose: {
    color: roseColor
  },
  gray: {
    color: grayColor
  },
  white: {
    color: "#FFFFFF"
  },
  iconWrapper: {
    margin: "10px auto 0px",
    fontSize: "55px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    width: "130px",
    lineHeight: "130px",
    height: "130px"
  },
  iconWrapperOnPlain: {
    border: "1px solid #FFFFFF"
  },
  icon: {
    width: "55px",
    height: "55px",
    top: "6px",
    position: "relative"
  }
};

export default pricingCardStyle;
