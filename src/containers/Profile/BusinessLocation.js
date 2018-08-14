import React from 'react';
import mapboxgl from 'mapbox-gl';

const STYLE = {
  height: 300,
  marginBottom: 48,
  marginTop: 24
};

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obndlaXN6IiwiYSI6ImNqa3NheWoyNTQzMHkzcW8zem4waTMyMmkifQ._qzWXiBScWpNONx6BxWvgg';

export default class BusinessLocation extends React.PureComponent {
  render() {
    if (!this.props.location) {
      return null;
    }

    return (
      <div style={STYLE} ref={div => this.container = div} />
    );
  }

  componentDidMount() {
    this.createMapIfNeeded();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if (this.map) {
        this.map.remove();
      }
    }

    this.createMapIfNeeded();
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  createMapIfNeeded() {
    if (this.container && !this.map) {
      this.map = new mapboxgl.Map({
        container: this.container,
        style: 'mapbox://styles/mapbox/streets-v9'
      });
    }
  }
}
