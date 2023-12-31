import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
let lati, longi;

const loc = () => navigator.geolocation.getCurrentPosition((position) => {
  const {latitude, longitude} = (position.coords);
  lati = latitude;
  longi = longitude;
})

loc();

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: lati,
      lng: longi
    },
    zoom: 16
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '70vh', width: '100%' }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={lati}
          lng={longi}
          text="You're Here"
        />
      </GoogleMapReact>
    </div>
  );
}