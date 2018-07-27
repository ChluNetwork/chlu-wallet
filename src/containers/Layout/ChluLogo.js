import React from "react";
import PropTypes from "prop-types";

const DASH_GAP_FACTOR = 2.7;

class ChluLogo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.circles = [];
  }

  render() {
    let style = {
      height: this.props.size,
      width: this.props.size,
      overflow: "visible"
      // filter: "drop-shadow(0 0 1px rgba(255,255,255,0.6))"
    }

    return (
      <svg
        onMouseEnter={this.handleMouseOver}
        viewBox="0 0 100 100"
        style={style}
      >
        {this.circle(0, this.props.size, this.props.size / 5)}
        {this.circle(1, this.props.size * 5 / 8, this.props.size / 8 * 4 / 8, true)}
        {this.circle(2, this.props.size * 2 / 8, this.props.size / 8 * 2 / 8)}
      </svg>
    )
  }

  circle(i, r, w, invert) {
    let d = this.defineArc(r, Math.PI * 0.35, Math.PI * 1.65);
    let d2 = this.defineArc(r, Math.PI * 1.65, Math.PI * 0.35);
    let style = invert ? { transform: "rotate(180deg)", transformOrigin: "center center" } : undefined;

    let w2 = w * 3 / 4;

    return (
      <g ref={g => this.circles[i] = g}>
        <path
          style={style}
          x={0}
          y={0}
          fill="transparent"
          stroke={this.props.color}
          strokeWidth={w}
          d={d}
        />
        <path
          style={style}
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
    )
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

ChluLogo.defaultProps = {
  size: 60,
  color: "#fff"
};

export default ChluLogo;
