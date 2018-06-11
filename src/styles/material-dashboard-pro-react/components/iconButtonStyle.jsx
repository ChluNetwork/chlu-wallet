// ##############################
// // // IconButton styles
// #############################

import {
  grayColor,
  roseColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from 'styles/material-dashboard-pro-react'

const iconButtonStyle = {
  button: {
    color: "#FFFFFF",
    height: "42px",
    minWidth: "42px",
    width: "42px",
    borderRadius: "50%",
    fontSize: "20px",
    padding: "11px 11px",
    lineHeight: "1em",
    margin: "auto",
    boxShadow:
      "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)",
    overflow: "hidden",
    position: "relative",
    border: "none",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: "0",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "inline-block",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    userSelect: "none",
    backgroundImage: "none",
    backgroundColor: grayColor,
    "&:hover": {
      backgroundColor: grayColor,
      boxShadow:
        "0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)"
    }
  },
  primary: {
    backgroundColor: primaryColor,
    boxShadow:
      "0 2px 2px 0 rgba(156, 39, 176, 0.14), 0 3px 1px -2px rgba(156, 39, 176, 0.2), 0 1px 5px 0 rgba(156, 39, 176, 0.12)",
    "&:hover": {
      backgroundColor: primaryColor,
      boxShadow:
        "0 14px 26px -12px rgba(156, 39, 176, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(156, 39, 176, 0.2)"
    }
  },
  info: {
    backgroundColor: infoColor,
    boxShadow:
      "0 2px 2px 0 rgba(0, 188, 212, 0.14), 0 3px 1px -2px rgba(0, 188, 212, 0.2), 0 1px 5px 0 rgba(0, 188, 212, 0.12)",
    "&:hover": {
      backgroundColor: infoColor,
      boxShadow:
        "0 14px 26px -12px rgba(0, 188, 212, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 188, 212, 0.2)"
    }
  },
  success: {
    backgroundColor: successColor,
    boxShadow:
      "0 2px 2px 0 rgba(76, 175, 80, 0.14), 0 3px 1px -2px rgba(76, 175, 80, 0.2), 0 1px 5px 0 rgba(76, 175, 80, 0.12)",
    "&:hover": {
      backgroundColor: successColor,
      boxShadow:
        "0 14px 26px -12px rgba(76, 175, 80, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(76, 175, 80, 0.2)"
    }
  },
  warning: {
    backgroundColor: warningColor,
    boxShadow:
      "0 2px 2px 0 rgba(255, 152, 0, 0.14), 0 3px 1px -2px rgba(255, 152, 0, 0.2), 0 1px 5px 0 rgba(255, 152, 0, 0.12)",
    "&:hover": {
      backgroundColor: warningColor,
      boxShadow:
        "0 14px 26px -12px rgba(255, 152, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(255, 152, 0, 0.2)"
    }
  },
  danger: {
    backgroundColor: dangerColor,
    boxShadow:
      "0 2px 2px 0 rgba(244, 67, 54, 0.14), 0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12)",
    "&:hover": {
      backgroundColor: dangerColor,
      boxShadow:
        "0 14px 26px -12px rgba(244, 67, 54, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(244, 67, 54, 0.2)"
    }
  },
  rose: {
    backgroundColor: roseColor,
    boxShadow:
      "0 2px 2px 0 rgba(233, 30, 99, 0.14), 0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12)",
    "&:hover": {
      backgroundColor: roseColor,
      boxShadow:
        "0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(233, 30, 99, 0.2)"
    }
  },
  defaultNoBackground: {
    "&,&:hover,&:focus": {
      color: grayColor,
      boxShadow: "none",
      backgroundColor: "transparent"
    }
  },
  primaryNoBackground: {
    "&,&:hover,&:focus": {
      color: primaryColor,
      boxShadow: "none",
      backgroundColor: "transparent"
    }
  },
  infoNoBackground: {
    "&,&:hover,&:focus": {
      color: infoColor,
      boxShadow: "none",
      backgroundColor: "transparent"
    }
  },
  successNoBackground: {
    "&,&:hover,&:focus": {
      color: successColor,
      boxShadow: "none",
      backgroundColor: "transparent"
    }
  },
  warningNoBackground: {
    "&,&:hover,&:focus": {
      color: warningColor,
      boxShadow: "none",
      backgroundColor: "transparent"
    }
  },
  dangerNoBackground: {
    "&,&:hover,&:focus": {
      color: dangerColor,
      boxShadow: "none",
      backgroundColor: "transparent"
    }
  },
  roseNoBackground: {
    "&,&:hover,&:focus": {
      color: roseColor,
      boxShadow: "none",
      backgroundColor: "transparent"
    }
  },
  white: {
    "&,&:focus,&:hover": {
      backgroundColor: "#FFFFFF",
      color: grayColor
    }
  },
  simple: {
    color: "#FFFFFF",
    background: "transparent",
    boxShadow: "none"
  },
  twitter: {
    backgroundColor: "#55acee",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(85, 172, 238, 0.14), 0 3px 1px -2px rgba(85, 172, 238, 0.2), 0 1px 5px 0 rgba(85, 172, 238, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#55acee",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(85, 172, 238, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(85, 172, 238, 0.2)"
    }
  },
  twitterNoBackground: {
    "&,&:hover,&:focus": {
      color: "#55acee",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  facebook: {
    backgroundColor: "#3b5998",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(59, 89, 152, 0.14), 0 3px 1px -2px rgba(59, 89, 152, 0.2), 0 1px 5px 0 rgba(59, 89, 152, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#3b5998",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(59, 89, 152, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(59, 89, 152, 0.2)"
    }
  },
  facebookNoBackground: {
    "&,&:hover,&:focus": {
      color: "#3b5998",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  google: {
    backgroundColor: "#dd4b39",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(221, 75, 57, 0.14), 0 3px 1px -2px rgba(221, 75, 57, 0.2), 0 1px 5px 0 rgba(221, 75, 57, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#dd4b39",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(221, 75, 57, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(221, 75, 57, 0.2)"
    }
  },
  googleNoBackground: {
    "&,&:hover,&:focus": {
      color: "#dd4b39",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  linkedin: {
    backgroundColor: "#0976b4",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(9, 118, 180, 0.14), 0 3px 1px -2px rgba(9, 118, 180, 0.2), 0 1px 5px 0 rgba(9, 118, 180, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#0976b4",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(9, 118, 180, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(9, 118, 180, 0.2)"
    }
  },
  linkedinNoBackground: {
    "&,&:hover,&:focus": {
      color: "#0976b4",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  pinterest: {
    backgroundColor: "#cc2127",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(204, 33, 39, 0.14), 0 3px 1px -2px rgba(204, 33, 39, 0.2), 0 1px 5px 0 rgba(204, 33, 39, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#cc2127",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(204, 33, 39, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(204, 33, 39, 0.2)"
    }
  },
  pinterestNoBackground: {
    "&,&:hover,&:focus": {
      color: "#cc2127",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  youtube: {
    backgroundColor: "#e52d27",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(229, 45, 39, 0.14), 0 3px 1px -2px rgba(229, 45, 39, 0.2), 0 1px 5px 0 rgba(229, 45, 39, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#e52d27",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(229, 45, 39, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(229, 45, 39, 0.2)"
    }
  },
  youtubeNoBackground: {
    "&,&:hover,&:focus": {
      color: "#e52d27",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  tumblr: {
    backgroundColor: "#35465c",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(53, 70, 92, 0.14), 0 3px 1px -2px rgba(53, 70, 92, 0.2), 0 1px 5px 0 rgba(53, 70, 92, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#35465c",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(53, 70, 92, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(53, 70, 92, 0.2)"
    }
  },
  tumblrNoBackground: {
    "&,&:hover,&:focus": {
      color: "#35465c",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  github: {
    backgroundColor: "#333333",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(51, 51, 51, 0.14), 0 3px 1px -2px rgba(51, 51, 51, 0.2), 0 1px 5px 0 rgba(51, 51, 51, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#333333",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(51, 51, 51, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(51, 51, 51, 0.2)"
    }
  },
  githubNoBackground: {
    "&,&:hover,&:focus": {
      color: "#333333",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  behance: {
    backgroundColor: "#1769ff",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(23, 105, 255, 0.14), 0 3px 1px -2px rgba(23, 105, 255, 0.2), 0 1px 5px 0 rgba(23, 105, 255, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#1769ff",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(23, 105, 255, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(23, 105, 255, 0.2)"
    }
  },
  behanceNoBackground: {
    "&,&:hover,&:focus": {
      color: "#1769ff",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  dribbble: {
    backgroundColor: "#ea4c89",
    color: "#fff",
    boxShadow:
      "0 2px 2px 0 rgba(234, 76, 137, 0.14), 0 3px 1px -2px rgba(234, 76, 137, 0.2), 0 1px 5px 0 rgba(234, 76, 137, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#ea4c89",
      color: "#fff",
      boxShadow:
        "0 14px 26px -12px rgba(234, 76, 137, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(234, 76, 137, 0.2)"
    }
  },
  dribbbleNoBackground: {
    "&,&:hover,&:focus": {
      color: "#ea4c89",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  },
  reddit: {
    backgroundColor: "#ff4500",
    color: " #fff",
    boxShadow:
      "0 2px 2px 0 rgba(255, 69, 0, 0.14), 0 3px 1px -2px rgba(255, 69, 0, 0.2), 0 1px 5px 0 rgba(255, 69, 0, 0.12)",
    "&:hover,&:focus": {
      backgroundColor: "#ff4500",
      color: " #fff",
      boxShadow:
        "0 14px 26px -12px rgba(255, 69, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(255, 69, 0, 0.2)"
    }
  },
  redditNoBackground: {
    "&,&:hover,&:focus": {
      color: "#ff4500",
      backgroundColor: "transparent",
      boxShadow: "none"
    }
  }
};

export default iconButtonStyle;
