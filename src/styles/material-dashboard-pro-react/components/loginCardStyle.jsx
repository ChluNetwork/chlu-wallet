// ##############################
// // // LoginCard styles
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

const loginCardStyle = {
  card: {
    ...card,
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    paddingBottom: "20px",
    transform: "translate3d(0, 0, 0)",
    transition: "all 300ms linear"
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardHeader: {
    ...cardHeader,
    ...defaultFont,
    textAlign: "center",
    marginTop: "-40px",
    marginBottom: "20px"
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
    ...defaultFont,
    color: "#FFFFFF",
    marginTop: "10px",
    marginBottom: "10px",
    fontWeight: "700",
    fontSize: "1.3em"
  },
  cardSubtitle: {
    ...defaultFont,
    textAlign: "center",
    fontSize: "14px"
  },
  cardActions: {
    padding: "0",
    display: "block",
    height: "auto"
  },
  cardContent: {
    padding: "0px 30px",
    position: "relative"
  },
  inputAdornmentIcon: {
    color: "#555"
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

export default loginCardStyle;
