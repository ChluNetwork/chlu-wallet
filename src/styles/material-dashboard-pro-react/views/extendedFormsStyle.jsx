// ##############################
// // // ExtendedForms view styles
// #############################

import customSelectStyle from "styles/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "styles/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const extendedFormsStyle = {
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex"
  },
  ...customCheckboxRadioSwitch,
  ...customSelectStyle
};

export default extendedFormsStyle;
