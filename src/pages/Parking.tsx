import React from 'react'

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMap from '../components/Map/RoutingMap';
import MultipleLocationMap from '../components/Map/MultipleLocationMap';
import "../Styles.scss"
import { Header } from '../components';
import L, { divIcon } from 'leaflet';
import customMarkerIcon from '../components/Map/images/dot-inside-a-circle.png';

const locations = [
    {
      name: 'detected-parking-1',
      latlng: [23.1500, 72.6600],
      driver: "Sarang",
      autoNo: "GJ 18 1234"
    },
    {
      name: 'detected-parking-2',
      latlng: [23.1861 , 72.6293],
      driver: "Jemin",
      autoNo: "GJ 18 5678"
    },
    {
      name: 'detected-parking-3',
      latlng: [23.1435 , 72.6510],
      driver: "Nilanjan",
      autoNo: "GJ 18 1357"
    },
    {
      name: 'detected-parking-4',
      latlng: [23.1585, 72.6828],
      driver: "Sohan",
      autoNo: "GJ 18 2468"
    },
    {
      name: 'detected-parking-5',
      latlng: [23.2372 , 72.6488],
      driver: "Ruchit",
      autoNo: "GJ 18 8907"
    },
    {
      name: 'detected-parking-6',
      latlng: [23.2375 , 72.6378],
      driver: "Ruchit",
      autoNo: "GJ 18 8907"
    },
    {
      name: 'detected-parking-7',
      latlng: [23.2072 , 72.6388],
      driver: "Ruchit",
      autoNo: "GJ 18 8907"
    },
    {
      name: 'detected-parking-8',
      latlng: [23.2140 , 72.6888],
      driver: "Ruchit",
      autoNo: "GJ 18 8907"
    },
    {
      name: 'detected-parking-9',
      latlng: [23.1915 , 72.6488],
      driver: "Ruchit",
      autoNo: "GJ 18 8907"
    },
    {
      name: 'detected-parking-10',
      latlng: [23.1872 , 72.5588],
      driver: "Ruchit",
      autoNo: "GJ 18 8907"
    }
  ];


  const customIcon = L.icon({
    iconUrl:customMarkerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

const Parking = () => {
    const position = [51.505, -0.09];
  return (
    <div className="largeMargin marginTopMedium largePadding mainBackground rounded3XLarge mainBorder mainShadow">
      <Header title="Parking" />
      <MultipleLocationMap locations={locations} height={'70vh'} customIcon={customIcon}/>
    </div>
  )
}

export default Parking
