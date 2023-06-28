import React from 'react'

import "leaflet/dist/leaflet.css";

import MultipleLocationMap from '../components/Map/MultipleLocationMap';
import "../Styles.css"
import { Header } from '../components';
import L, { divIcon } from 'leaflet';
import customMarkerIcon from '../components/Map/images/custom-marker-icon.png';



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
const customIcon = L.icon({
  iconUrl:customMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const Tracking = () => {
  const position = [51.505, -0.09];
  return (
    <div className="largeMargin marginTopMedium largePadding mainBackground rounded3XLarge mainBorder mainShadow">
      <Header title="Tracking" />
      <MultipleLocationMap locations={locations} height={'70vh'} customIcon={customIcon}/>
    </div>
  )
}

export default Tracking


