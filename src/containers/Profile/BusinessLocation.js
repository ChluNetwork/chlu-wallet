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

    if (this.props.location) {
      this.addMapMarkerFromCurrentLocation();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.location && this.map) {
      this.map.remove();
    } else if (this.props.location !== prevProps.location && this.map) {
      // Location changing, need new coordinates for map.
      this.addMapMarkerFromCurrentLocation();
    } else {
      this.createMapIfNeeded();
      this.addMapMarkerFromCurrentLocation();
    }
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
        style: 'mapbox://styles/mapbox/streets-v9',
      });
    }
  }

  addMapMarkerFromCurrentLocation() {
    let { latitude, longitude, bounds } = this.props.location;

    if (this.map) {
      let markerElem = document.createElement("div");

      markerElem.style.width = "24px";
      markerElem.style.height = "24px";
      markerElem.style.borderRadius = "24px";
      markerElem.style.backgroundColor = "red";
      markerElem.style.border = "2px solid white";

      if (this.locationMarker) {
        this.locationMarker.remove();
      }

      this.locationMarker = new mapboxgl.Marker(markerElem).setLngLat([latitude, longitude]).addTo(this.map);
      this.map.fitBounds(bounds);
    }
  }
}
