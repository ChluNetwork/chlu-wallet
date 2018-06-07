// ##############################
// // // TasksCard component styles
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

const tasksCardStyle = theme => ({
  card,
  cardHeader: {
    flex: "none",
    ...cardHeader,
    ...defaultFont
  },
  cardHeaderRTL: {
    display: "block",
    "&:after,&:before": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      boxSizing: "border-box"
    }
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  roseCardHeader,
  cardTitle: {
    ...defaultFont,
    float: "left",
    padding: "10px 10px 10px 0",
    lineHeight: "24px",
    fontSize: "14px",
    color: "#FFFFFF"
  },
  cardTitleRTL: {
    float: "right",
    padding: "10px 0px 10px 10px !important"
  },
  tabWrapper: {
    width: "auto",
    display: "inline-flex",
    alignItems: "inherit",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex"
    }
  },
  tabWrapperRTL: {
    display: "block"
  },
  tabIcon: {
    float: "left",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-2px"
    }
  },
  tabIconRTL: {
    float: "right",
    top: "2px",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginRight: "14px",
      top: "5px"
    }
  },
  displayNone: {
    display: "none"
  },
  labelContainerRTL: {
    float: "right",
    paddingRight: "10px",
    paddingLeft: "14px"
  },
  labelIcon: {
    height: "44px",
    width: "110px",
    minWidth: "72px",
    paddingLeft: "14px",
    borderRadius: "3px"
  },
  labelIconRTL: {
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  tabsContainer: {
    marginTop: "4px",
    color: "#FFFFFF",
    display: "flex",
    flexWrap: "wrap"
  },
  tabsContainerRTL: {
    float: "right"
  },
  tabs: {
    width: "110px",
    minWidth: "70px",
    paddingLeft: "12px"
  },
  cardHeaderContent: {
    flex: "none"
  },
  label: {
    lineHeight: "19px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "500",
    marginLeft: "-10px"
  },
  textColorInheritSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transition: "background-color .4s"
  }
});

export default tasksCardStyle;
