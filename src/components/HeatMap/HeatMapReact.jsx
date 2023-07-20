import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';

const MapWithHeatmapLayer = () => {
  const heatmapData = [
    // Your heatmap data in the format [lat, lng, intensity]
    [51.5, -0.09, 1],
    [51.51, -0.1, 0.5],
    // Add more data points as needed
  ];

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <HeatmapLayer
        points={heatmapData}
        longitudeExtractor={(point) => point[1]}
        latitudeExtractor={(point) => point[0]}
        intensityExtractor={(point) => point[2]}
      />
    </MapContainer>
  );
};

export default MapWithHeatmapLayer;
