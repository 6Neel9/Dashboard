import  {  useState } from 'react';
import { MapContainer as Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer';
// import { map } from 'leaflet';
import { LatLngTuple } from 'leaflet';


// Define the interface for the AddressPoint
interface AddressPoint {
    latitude: number;
    longitude: number;
    intensity: number;
  }

const addressPointsData: [number, number, number][] = [
    [40.7128, -74.0060, 0.6], // New York City, NY, USA
    [34.0522, -118.2437, 0.8], // Los Angeles, CA, USA
    [51.5074, -0.1278, 0.4], // London, UK
    [48.8566, 2.3522, 0.7], // Paris, France
    [35.6895, 139.6917, 0.9], // Tokyo, Japan
    [55.7558, 37.6176, 0.5], // Moscow, Russia
    [52.5200, 13.4050, 0.3], // Berlin, Germany
    [41.8781, -87.6298, 0.6], // Chicago, IL, USA
    [22.5726, 88.3639, 0.8], // Kolkata, India
    [-33.8688, 151.2093, 0.4], // Sydney, Australia
    [-23.5505, -46.6333, 0.7], // Sao Paulo, Brazil
    [-36.8485, 174.7633, 0.9], // Auckland, New Zealand
    [55.7558, 12.4376, 0.5], // Copenhagen, Denmark
    [37.7749, -122.4194, 0.3], // San Francisco, CA, USA
  ];


  // Convert the data to the AddressPoint format
const addressPoints: AddressPoint[] = addressPointsData.map(
    ([latitude, longitude, intensity]) => ({
      latitude,
      longitude,
      intensity,
    })
  );
  


const HeatmapOnMap = () => {
  const initialMapCenter:LatLngTuple = [40.7128, -74.0060];
  const [mapCenter, setMapCenter] =  useState<LatLngTuple>(initialMapCenter);

  return (
    <div>
      <Map center={mapCenter} zoom={2} style={{ height: '500px' }}>
        <HeatmapLayer
          maxZoom={10} // Limit the heatmap intensity at higher zoom levels
          opacity={0.8} // Set the heatmap opacity (adjust as needed)
          radius={20}
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={addressPoints}
          longitudeExtractor={(m:any) => m[1]}
          latitudeExtractor={(m:any) => m[0]}
          intensityExtractor={(m:any) => parseFloat(m[2])}
        />
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    </div>
  );
};

export default HeatmapOnMap;







