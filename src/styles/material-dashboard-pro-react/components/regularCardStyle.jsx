// ##############################
// // // RegularCard styles
// #############################

import { card, defaultFont } from 'styles/material-dashboard-pro-react'

const regularCardStyle = {
  card,
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  cardHeader: {
    padding: "15px 20px 0",
    zIndex: "3"
  },
  cardTitle: {
    ...defaultFont,
    color: "#3C4858",
    textDecoration: "none",
    marginTop: "0",
    marginBottom: "3px",
    fontSize: "1.3em",
    "& small": {
      fontWeight: "400",
      lineHeight: "1",
      color: "#777"
    }
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  center: {
    textAlign: "center"
  },
  cardSubtitle: {
    ...defaultFont,
    color: "#999999",
    fontSize: "14px",
    margin: "0 0 10px"
  },
  cardContent: {
    padding: "15px 20px !important",
    position: "relative"
  }
};

export default regularCardStyle;
