import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {GrLocation} from 'react-icons/gr';


import customMarkerIcon from './images/custom-marker-icon.png';

const customIcon = L.icon({
  iconUrl:customMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const MultipleLocationMap = () => {
  const locations = [
    {
      name: 'PDEU',
      latlng: [23.1566, 72.6654],
      driver: "Sarang",
      autoNo: "GJ 18 1234"
    },
    {
      name: 'DAIICT',
      latlng: [23.1885 , 72.6289],
      driver: "Jemin",
      autoNo: "GJ 18 5678"
    },
    {
      name: 'GNLU',
      latlng: [23.1537 , 72.6608],
      driver: "Nilanjan",
      autoNo: "GJ 18 1357"
    },
    {
      name: 'GIFT CITY',
      latlng: [23.1586, 72.6831],
      driver: "Sohan",
      autoNo: "GJ 18 2468"
    },
    {
      name: 'Gandhinagar',
      latlng: [23.237560 , 72.647781],
      driver: "Ruchit",
      autoNo: "GJ 18 8907"
    }
  ];

    // Calculate the average latitude and longitude
    const centerLat = locations.reduce((sum, location) => sum + location.latlng[0], 0) / locations.length;
    const centerLng = locations.reduce((sum, location) => sum + location.latlng[1], 0) / locations.length;

    

  return (
    <MapContainer center={[centerLat, centerLng]}  zoom={13} style={{ height: '70vh' }}>
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
