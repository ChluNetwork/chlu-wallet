import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const DASH_GAP_FACTOR = 2.7; // Smaller values yield less space between dots.
const ARC_ANGLE = 0.35; // Smaller values yield more solid line, less dots.

class ChluLogo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.circles = [];
  }

  render() {
    let svgStyle = {
      height: this.props.logoSize,
      width: this.props.logoSize,
      overflow: "visible"
    };

    return (
      <Link onMouseEnter={this.handleMouseOver} to='/'>
        <div className={this.props.classes.logo}>
          <svg
            viewBox="0 0 100 100"
            style={svgStyle}
          >
            {this.circle(0, this.props.logoSize, this.props.logoSize / 5, false, true)}
            {this.circle(1, this.props.logoSize * 5 / 8, this.props.logoSize / 8 * 4 / 8, true)}
            {this.circle(2, this.props.logoSize * 2 / 8, this.props.logoSize / 8 * 2 / 8)}
          </svg>
          hlu
        </div>

        <Button className={this.props.classes.logotag}>
          Your Reputation Wallet
        </Button>
      </Link>
    );
  }

  circle(i, r, w, invert, noDashedArc) {
    let d = this.defineArc(r, Math.PI * ARC_ANGLE, Math.PI * (2 - ARC_ANGLE));
    let d2 = this.defineArc(r, Math.PI * (2 - ARC_ANGLE), Math.PI * ARC_ANGLE);
    let style = invert ? { transform: "rotate(180deg)", transformOrigin: "50% 50%" } : undefined;

    let w2 = w * 3 / 4;

    return (
      <g ref={g => this.circles[i] = g}>
        <g style={style}>
          <path
            x={0}
            y={0}
            fill="transparent"
            stroke={this.props.color}
            strokeWidth={w}
            d={d}
          />
          <path
            opacity={noDashedArc ? 0 : 1}
            x={0}
            y={0}
            fill="transparent"
            stroke={this.props.color}
            strokeWidth={w2}
            strokeDasharray={`${w2} ${w2 * DASH_GAP_FACTOR}`}
            strokeDashoffset={w2 + w2 * DASH_GAP_FACTOR / 2}
            d={d2}
          />
        </g>
      </g>
    );
  }

  defineArc(radius, startAngle, endAngle) {
    let start = this.cartesianCoordinates(50, 50, radius, endAngle);
    let end = this.cartesianCoordinates(50, 50, radius, startAngle);
    let largeArcFlag = (endAngle - startAngle) < Math.PI ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  }

  cartesianCoordinates(centerX, centerY, radius, angle) {
    return {
      x: centerX + (radius * Math.cos(angle)),
      y: centerY + (radius * Math.sin(angle))
    };
  }

  componentDidMount() {
    this.runAnim();
  }

  handleMouseOver = () => {
    this.runAnim();
  }

  runAnim() {
    for (let i = 0; i < this.circles.length; i++) {
      let circle = this.circles[i];
      let keyFrames = [
        { transform: "rotate(360deg)", transformOrigin: "center center" },
        { transform: "rotate(0deg)", transformOrigin: "center center" }
      ];

      if (i % 2 === 1) {
        keyFrames = keyFrames.reverse();
      }

      if (circle.animate) {
        // TODO: HTMLElement.prototype.animate should be polyfilled.
        circle.animate(
          keyFrames,
          {
            duration: 1400,
            easing: "cubic-bezier(0.6,0,0,1)"
          }
        );
      }
    }
  }
}

ChluLogo.defaultProps = {
  logoSize: 50,
  color: "#fff"
};

export default ChluLogo;
