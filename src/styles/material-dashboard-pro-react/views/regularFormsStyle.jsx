// ##############################
// // // RegularForms view styles
// #############################

import customCheckboxRadioSwitch from "styles/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const regularFormsStyle = {
  ...customCheckboxRadioSwitch,
  staticFormGroup: {
    marginLeft: "0",
    marginRight: "0",
    paddingBottom: "10px",
    margin: "8px 0 0 0",
    position: "relative",
    "&:before,&:after": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      clear: "both"
    }
  },
  infoText: {
    fontWeight: "300",
    margin: "0px 0 0px",
    textAlign: "center"
  },
  staticFormControl: {
    marginBottom: "0",
    paddingTop: "8px",
    paddingBottom: "8px",
    minHeight: "34px"
  },
};

export default regularFormsStyle;
