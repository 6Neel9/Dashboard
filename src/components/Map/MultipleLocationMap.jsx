import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';





const MultipleLocationMap = ({locations, height, customIcon}) => {

    // Calculate the average latitude and longitude
    const centerLat = locations.reduce((sum, location) => sum + location.latlng[0], 0) / locations.length;
    const centerLng = locations.reduce((sum, location) => sum + location.latlng[1], 0) / locations.length;
  return (
    <MapContainer center={[centerLat, centerLng]}  zoom={13} style={{ height: height }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19}/>
      {locations.map((location, index) => (
        <Marker key={index} position={location.latlng} icon={customIcon}>
          <Popup>Location: {location.name} <br/>
          Diver: {location.driver}<br/>
          Auto No: {location.autoNo}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    
  );
};

export default MultipleLocationMap;
