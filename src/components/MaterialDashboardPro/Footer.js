import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
// components
import {
  withStyles,
  List,
  ListItem
 } from "@material-ui/core";
// style
import footerStyle from "styles/material-dashboard-pro-react/components/footerStyle";

function Footer({ ...props }) {
  const { classes, fluid, white, rtlActive } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  })
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href='/' className={block}>
                {rtlActive ? "الصفحة الرئيسية" : "Home"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href='http://www.chlu.io' className={block}>
                {rtlActive ? "شركة" : "Company"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href='https://medium.com/chlunetwork' className={block}>
                {rtlActive ? "مدونة" : "Blog"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href='https://github.com/ChluNetwork' className={block}>
                {rtlActive ? "بعدسة" : "Source"}
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a href='https://www.creative-tim.com' className={anchor}>
            {rtlActive ? "توقيت الإبداعية" : "Chlu"}
          </a>
          {rtlActive
            ? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"
            : " - The Reputation Token: Pay, Review, Earn Chlu"}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
