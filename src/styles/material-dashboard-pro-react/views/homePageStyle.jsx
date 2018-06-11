// ##############################
// // // Home Pages View styles
// #############################

import {
  container,
  defaultFont
} from 'styles/material-dashboard-pro-react'

import customCheckboxRadioSwitch from "styles/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const homePageStyle = {
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
    textAlign: "center"
  },
  description: {
    fontSize: "18px",
    color: "#FFFFFF",
    textAlign: "center"
  },
  cta: {
    fontSize: "18px",
    color: "#000000",
    textAlign: "center"
  },
  inputAdornment: {
    marginRight: "18px",
    top: "18px",
    position: "relative",
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  checkboxLabelControl: {
    margin: "0"
  },
  checkboxLabel: {
    marginLeft: "6px",
    marginRight: "36px",
    color: "rgba(0, 0, 0, 0.26)"
  },
  ...customCheckboxRadioSwitch,
  cardTitle: {
    fontSize: "2.6em"
  },
  learnMore: {
    ...defaultFont,
    color: "#FFFFFF",
    marginTop: "8vh",
    marginBottom: "0vh",
    textAlign: "center"
  }
};

export default homePageStyle;
