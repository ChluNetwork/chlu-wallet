// ##############################
// // // IconCard styles
// #############################

import {
  card,
  cardHeader,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  roseCardHeader
} from 'styles/material-dashboard-pro-react'

const iconCardStyle = {
  card,
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardHeader: {
    ...cardHeader,
    float: "left"
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  roseCardHeader,
  cardContent: {
    padding: "15px 20px",
    position: "relative"
  },
  cardAvatar: {
    margin: "0px"
  },
  cardIcon: {
    paddingTop: "3px",
    paddingLeft: "4px",
    paddingRight: "5px",
    color: "#FFFFFF",
    width: "33px",
    height: "27px"
  },
  cardTitle: {
    paddingBottom: "15px",
    marginTop: "0",
    marginBottom: "3px",
    color: "#3C4858",
    textDecoration: "none"
  },
  cardCategory: {
    color: "#999999",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1",
    marginBottom: "0"
  },
  cardFooter: {
    margin: "0 20px 10px",
    paddingTop: "10px",
    borderTop: "1px solid #eeeeee"
  }
};

export default iconCardStyle;
