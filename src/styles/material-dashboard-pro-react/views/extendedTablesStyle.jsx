// ##############################
// // // ExtendedTables view styles
// #############################

import buttonGroupStyle from "styles/material-dashboard-pro-react/buttonGroupStyle.jsx";
import { primaryColor } from 'styles/material-dashboard-pro-react'

const extendedTablesStyle = {
  right: {
    textAlign: "right"
  },
  center: {
    textAlign: "center"
  },
  description: {
    maxWidth: "150px"
  },
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px"
  },
  icon: {
    verticalAlign: "middle",
    width: "17px",
    height: "17px",
    top: "-1px",
    position: "relative"
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
  ...buttonGroupStyle,
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block"
  },
  img: {
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
    border: "0"
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.5em"
  },
  tdNameAnchor: {
    color: "#3C4858"
  },
  tdNameSmall: {
    color: "#999999",
    fontSize: "0.75em",
    fontWeight: "300"
  },
  tdNumber: {
    textAlign: "right",
    minWidth: "145px",
    fontWeight: "300",
    fontSize: "1.3em !important"
  },
  tdNumberSmall: {
    marginRight: "3px"
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important"
  },
  positionAbsolute: {
    position: "absolute",
    right: "0",
    top: "0",
  },
  customFont: {
    fontSize: "16px !important"
  },
  actionButtonRound: {
    width: "auto",
    height: "auto",
    minWidth: "auto"
  }
};

export default extendedTablesStyle;
