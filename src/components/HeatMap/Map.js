import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { geojson } from "./atd";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [state, setState] = useState({
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  });

  const position = [state.lat, state.lng];

  return (
    <MapContainer center={position} zoom={state.zoom}>
      {/* <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={geojson.features}
        longitudeExtractor={m => m.geometry.coordinates[0]}
        latitudeExtractor={m => m.geometry.coordinates[1]}
        intensityExtractor={m => parseFloat(m.geometry.coordinates[1])}
      /> */}

      <TileLayer
        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;



