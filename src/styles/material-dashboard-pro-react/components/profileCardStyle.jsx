// ##############################
// // // ProfileCard styles
// #############################

import {
  card,
  boxShadow,
  grayColor,
  defaultFont
} from 'styles/material-dashboard-pro-react'

const profileCardStyle = {
  card: {
    marginTop: "30px",
    textAlign: "center",
    ...card
  },
  cardHeader: {
    display: "inline-block",
    width: "100%",
    padding: "0px"
  },
  cardAvatar: {
    maxWidth: "130px",
    maxHeight: "130px",
    margin: "-50px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    ...boxShadow
  },
  img: {
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
    border: "0"
  },
  textAlign: {
    textAlign: "center"
  },
  cardSubtitle: {
    color: grayColor,
    ...defaultFont,
    fontSize: "14px",
    textTransform: "uppercase",
    marginTop: "10px"
  },
  cardTitle: {
    ...defaultFont,
    fontSize: "18px",
    marginBottom: "3px"
  },
  cardDescription: {
    ...defaultFont,
    color: "#999999",
    fontSize: "14px",
    margin: "0 0 10px"
  },
  cardActions: {
    height: "auto",
    display: "inline"
  },
  cardContent: {
    padding: "15px 20px !important",
    position: "relative"
  },
  cardFooter: {
    margin: "0 20px 10px",
    paddingTop: "10px",
    borderTop: "1px solid #eeeeee"
  }
};

export default profileCardStyle;
