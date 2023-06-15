import React from 'react'

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMap from '../components/Map/RoutingMap';

const Tracking = () => {
  const position = [51.505, -0.09];
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:text-white dark:bg-flow_blue rounded-3xl border-1 border-[#8b7da9] shadow-lg shadow-[#8b7da9]">
      <MapContainer  zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMap />
    </MapContainer>
    </div>
  )
}

export default Tracking
