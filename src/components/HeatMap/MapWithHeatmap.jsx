import React from 'react';
import {MapContainer as Map, LayersControl, TileLayer } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { coordinates } from "./data";


const { BaseLayer } = LayersControl;
const KEY = "AIzaSyCslcAYM-oznuRDr9Ykr64hfiQx73refKc";

const MapWithHeatmap = () => {
 
  return (
    <div>
    <Map
      style={{ height: "100vh", width: "100%" }}
      zoom={13}
      center={[10, 10]}
    >
      <LayersControl>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
       
      </LayersControl>
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={coordinates}
        longitudeExtractor={(m) => parseFloat(m.lng)}
        latitudeExtractor={(m) => parseFloat(m.lat)}
        intensityExtractor={(m) => parseFloat(m.count)}
        max={10}
        minOpacity={0.6}
        radius={10}
      />
    </Map>
  </div>
  );
};

export default MapWithHeatmap;
