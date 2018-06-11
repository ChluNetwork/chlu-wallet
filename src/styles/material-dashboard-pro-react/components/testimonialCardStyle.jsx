// ##############################
// // // TestimonialCard component styles
// #############################

import { card } from 'styles/material-dashboard-pro-react'

const testimonialCardStyle = {
  card: {
    ...card,
    marginBottom: "65px",
    marginTop: "30px",
    textAlign: "center"
  },
  iconWrapper: {
    marginTop: "30px"
  },
  icon: {
    width: "40px",
    height: "40px"
  },
  cardContent: {
    padding: "15px 20px",
    position: "relative"
  },
  cardDescription: {
    fontStyle: "italic",
    color: "#999999"
  },
  footer: {
    marginTop: "0"
  },
  cardTitle: {
    marginTop: "0",
    marginBottom: "3px",
    color: "#3C4858",
    textDecoration: "none"
  },
  cardCategory: {
    color: "#999999",
    fontSize: "14px",
    margin: "10px 0"
  },
  cardAvatar: {
    marginTop: "10px",
    marginBottom: "-50px",
    maxWidth: "100px",
    maxHeight: "100px",
    margin: "-50px auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow:
      "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  img: {
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
    border: "0"
  }
};

export default testimonialCardStyle;
