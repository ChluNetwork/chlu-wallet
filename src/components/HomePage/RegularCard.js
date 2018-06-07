import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";
import CardHeader from "material-ui/Card/CardHeader";

import regularCardStyle from "assets/jss/material-dashboard-pro-react/components/regularCardStyle";

function RegularCard({ ...props }) {
  const {
    classes,
    plainCard,
    cardTitle,
    cardSubtitle,
    content,
    titleAlign,
    customCardClasses,
    contentAlign,
    subtitleAlign,
    customCardTitleClasses
  } = props;
  const cardClasses =
    classes.card +
    cx({
      [" " + classes.cardPlain]: plainCard,
      [" " + customCardClasses]: customCardClasses !== undefined
    });
  return (
    <Card className={cardClasses}>
      {cardTitle !== undefined || cardSubtitle !== undefined ? (
        <CardHeader
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle + " " + classes[titleAlign] + " " + customCardTitleClasses,
            subheader: classes.cardSubtitle + " " + classes[subtitleAlign]
          }}
          title={cardTitle}
          subheader={cardSubtitle}
        />
      ) : null}
      <CardContent
        className={classes.cardContent + " " + classes[contentAlign]}
      >
        {content}
      </CardContent>
    </Card>
  );
}

RegularCard.propTypes = {
  classes: PropTypes.object.isRequired,
  customCardClasses: PropTypes.string,
  customCardTitleClasses: PropTypes.string,
  plainCard: PropTypes.bool,
  cardTitle: PropTypes.node,
  cardSubtitle: PropTypes.node,
  content: PropTypes.node,
  titleAlign: PropTypes.oneOf(["right", "left", "center"]),
  contentAlign: PropTypes.oneOf(["right", "left", "center"]),
  subtitleAlign: PropTypes.oneOf(["right", "left", "center"])
};

export default withStyles(regularCardStyle)(RegularCard);
