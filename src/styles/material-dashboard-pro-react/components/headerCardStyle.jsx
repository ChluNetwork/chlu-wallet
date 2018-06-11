// ##############################
// // // RegularCard styles
// #############################

import {
  card,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  roseCardHeader
} from 'styles/material-dashboard-pro-react'

const headerCardStyle = {
  card,
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardHeader: {
    ...cardHeader,
    ...defaultFont,
    display: "inline-block",
  },
  cardPlainHeader: {
    marginLeft: 0,
    marginRight: 0
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  roseCardHeader,
  cardTitle: {
    color: "#FFFFFF",
    marginTop: "0",
    marginBottom: "3px",
    ...defaultFont,
    fontSize: "1.3em",
  },
  cardSubtitle: {
    marginBottom: "0",
    color: "rgba(255, 255, 255, 0.62)",
    fontSize: "14px"
  },
  cardActions: {
    padding: "14px",
    display: "block",
    height: "auto"
  },
  cardContent: {
    padding: "15px 20px",
    position: "relative"
  },
  left: {
    textAlign: "left"
  },
  right: {
    textAlign: "right"
  },
  center: {
    textAlign: "center"
  }
};

export default headerCardStyle;
