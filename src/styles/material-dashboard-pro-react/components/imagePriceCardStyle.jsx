// ##############################
// // // ChartCard styles
// #############################

import {
  card,
  cardHeader,
  defaultFont,
  cardActions,
  grayColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  primaryColor,
  roseColor,
  boxShadow
} from 'styles/material-dashboard-pro-react'

const imagePriceCardStyle = {
  card,
  cardHeader: {
    ...cardHeader,
    padding: "0",
    ...defaultFont,
    position: "relative",
    zIndex: 3,
    transition: "all 300ms cubic-bezier(0.34, 1.61, 0.7, 1)",
    transform: "translate3d(0, 0, 0)",
    height: "60%",
    overflow: "hidden",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "-30px",
    borderRadius: "6px",
    ...boxShadow
  },
  underImage: {
    position: "absolute",
    zIndex: "1",
    top: "-50px",
    width: "calc(100% - 30px)",
    left: "17px",
    right: "17px",
    textAlign: "center"
  },
  moveImageUp: {
    transform: "translate3d(0, -50px, 0)"
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: "6px",
    pointerEvents: "none",
    verticalAlign: "middle"
  },
  cardContent: {
    padding: "15px 20px",
    position: "relative"
  },
  cardTitle: {
    marginTop: "0",
    marginBottom: "5px",
    ...defaultFont,
    fontSize: "1.175em",
    textAlign: "center"
  },
  cardCategory: {
    marginBottom: "0",
    color: grayColor,
    ...defaultFont,
    fontSize: "0.9em",
    textAlign: "center"
  },
  cardActions: {
    ...cardActions,
    padding: "10px 0 0 0!important"
  },
  cardPrice: {
    display: "inline-block",
    margin: "0!important"
  },
  cardPriceText: {
    margin: "5px 0"
  },
  cardStats: {
    lineHeight: "22px",
    color: grayColor,
    fontSize: "12px",
    display: "inline-block",
    marginRight: "0",
    marginLeft: "auto"
  },
  cardStatsIcon: {
    position: "relative",
    top: "4px",
    width: "16px",
    height: "16px"
  },
  warningCardStatsIcon: {
    color: warningColor
  },
  primaryCardStatsIcon: {
    color: primaryColor
  },
  dangerCardStatsIcon: {
    color: dangerColor
  },
  successCardStatsIcon: {
    color: successColor
  },
  infoCardStatsIcon: {
    color: infoColor
  },
  roseCardStatsIcon: {
    color: roseColor
  },
  grayCardStatsIcon: {
    color: grayColor
  },
  cardStatsLink: {
    color: primaryColor,
    textDecoration: "none",
    ...defaultFont
  },
  link: {
    margin: "0 !important",
    padding: "0 !important"
  }
};

export default imagePriceCardStyle;
