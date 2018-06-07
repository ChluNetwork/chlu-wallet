import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
// components
import { Button } from '@material-ui/core'
// material-ui components
import { withStyles } from '@material-ui/core'

import buttonStyle from "styles/material-dashboard-pro-react/components/buttonStyle";

function RegularButton({ ...props }) {
  const {
    classes,
    color,
    round,
    children,
    fullWidth,
    disabled,
    customClass,
    right,
    justIcon,
    size,
    wd,
    ...rest
  } = props;
  const btnClasses = cx({
    [classes[color]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [customClass]: customClass,
    [classes.right]: right,
    [classes.justIcon]: justIcon,
    [classes.wd]: wd,
    [classes[size]]: size
  });
  return (
    <Button {...rest} className={classes.button + " " + btnClasses}>
      {children}
    </Button>
  );
}

RegularButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "defaultNoBackground",
    "primaryNoBackground",
    "infoNoBackground",
    "successNoBackground",
    "warningNoBackground",
    "dangerNoBackground",
    "roseNoBackground",
    "twitter",
    "twitterNoBackground",
    "facebook",
    "facebookNoBackground",
    "google",
    "googleNoBackground",
    "linkedin",
    "linkedinNoBackground",
    "pinterest",
    "pinterestNoBackground",
    "youtube",
    "youtubeNoBackground",
    "tumblr",
    "tumblrNoBackground",
    "github",
    "githubNoBackground",
    "behance",
    "behanceNoBackground",
    "dribbble",
    "dribbbleNoBackground",
    "reddit",
    "redditNoBackground",
    "white",
    "simple",
    "transparent"
  ]),
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  customClass: PropTypes.string,
  // make the button's min width to 160px
  wd: PropTypes.bool,
  // make the button smaller
  justIcon: PropTypes.bool,
  // button will float right
  right: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "lg", "xs"])
};

export default withStyles(buttonStyle)(RegularButton);
