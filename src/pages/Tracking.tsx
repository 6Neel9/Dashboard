import React from 'react'

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMap from '../components/Map/RoutingMap';
import MultipleLocationMap from '../components/Map/MultipleLocationMap';
import "../Styles.css"

const Tracking = () => {
  const position = [51.505, -0.09];
  return (
    <div className="largeMargin marginTopLarge largePadding mainBackground rounded3XLarge mainBorder mainShadow">
      {/* <MapContainer  zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMap />
    </MapContainer> */}
      <MultipleLocationMap />
    </div>
  )
}

export default Tracking
