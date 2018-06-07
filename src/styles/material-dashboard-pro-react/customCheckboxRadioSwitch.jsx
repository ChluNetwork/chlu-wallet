// ##############################
// // // Checkbox, Radio and Switch styles
// #############################

import {
  primaryColor,
  dangerColor,
  roseColor,
  grayColor
} from 'styles/material-dashboard-pro-react'

const customCheckboxRadioSwitch = {
  checkboxAndRadio: {
    position: "relative",
    display: "block",
    marginTop: "10px",
    marginBottom: "10px"
  },
  checkboxAndRadioHorizontal: {
    position: "relative",
    display: "block",
    "&:first-child": {
      marginTop: "10px"
    },
    "&:not(:first-child)": {
      marginTop: "-14px"
    },
    marginTop: "0",
    marginBottom: "0"
  },
  checked: {
    color: primaryColor
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "9px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  disabledCheckboxAndRadio: {
    opacity: "0.45"
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
    transition: "0.3s ease all"
  },
  labelHorizontal: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "39px",
    marginRight: "0",
    "@media (min-width: 992px)": {
      float: "right"
    }
  },
  labelHorizontalRadioCheckbox:{
    paddingTop: "22px",
  },
  labelLeftHorizontal: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "22px",
    marginRight: "0"
  },
  labelError: {
    color: dangerColor
  },
  radio: {
    color: primaryColor
  },
  radioChecked: {
    width: "20px",
    height: "20px",
    border: "1px solid " + primaryColor,
    borderRadius: "50%"
  },
  radioUnchecked: {
    width: "0px",
    height: "0px",
    padding: "9px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "50%"
  },
  inlineChecks: {
    marginTop: "8px"
  },
  iconCheckbox: {
    height: "116px",
    width: "116px",
    color: grayColor,
    "& > span:first-child": {
      borderWidth: "4px",
      borderStyle: "solid",
      borderColor: "#CCCCCC",
      textAlign: "center",
      verticalAlign: "middle",
      borderRadius: "50%",
      color: "inherit",
      margin: "0 auto 20px",
      transition: "all 0.2s"
    },
    "&:hover": {
      color: roseColor,
      "& > span:first-child": {
        borderColor: roseColor
      }
    }
  },
  iconCheckboxChecked: {
    color: roseColor,
    "& > span:first-child": {
      borderColor: roseColor
    }
  },
  iconCheckboxIcon: {
    fontSize: "40px",
    lineHeight: "111px"
  },
  switchBarChecked: {
    backgroundColor: "rgba(80, 80, 80, 0.7)",
    opacity: "1",
    display: "inline-block",
    width: "30px",
    height: "15px",
    borderRadius: "15px",
    marginRight: "15px",
    transition: "background 0.3s ease",
    verticalAlign: "middle"
  },
  switchIcon: {
    border: "1px solid rgba(40, 40, 40, .54)",
    transition: "left 0.3s ease, background 0.3s ease, box-shadow 0.1s ease",
    boxShadow: "0 1px 3px 1px rgba(0, 0, 0, 0.4)"
  },
  switchIconChecked: {
    borderColor: primaryColor
  },
  switchChecked: {
    transform: "translateX(15px)!important",
    "& + $switchBarChecked": {
      backgroundColor: "rgba(156, 39, 176, 0.7)",
      opacity: "1",
      display: "inline-block",
      width: "30px",
      height: "15px",
      borderRadius: "15px",
      marginRight: "15px",
      transition: "background 0.3s ease",
      verticalAlign: "middle"
    }
  },
  switchUnchecked: {
    color: "#FFFFFF",
    transform: "translateX(-5px)"
  },
};

export default customCheckboxRadioSwitch;
