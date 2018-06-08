import React from "react";
import PropTypes from "prop-types";
// components
// custom components
import HomePageHeader from "./ChluLayoutHeader";
import Footer from "components/MaterialDashboardPro/Footer";
// style
import { withStyles } from "@material-ui/core";
import pagesStyle from "styles/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import bgImage from "images/chlu_background.png";

class HomePageLayout extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div>
        <HomePageHeader />
        <div className={classes.wrapper} ref='wrapper'>
          <div className={classes.fullPage}>
            <div style={{ zIndex:'4', position:'relative' }}>{children}</div>
            <Footer white />
            <div
              className={classes.fullPageBackground}
              style={{ backgroundImage: 'url(' + bgImage + ')' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

HomePageLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(HomePageLayout);