import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png"
});

export default function Routing({start, end}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat,end.lng)],
      routeWhileDragging: true,
      show: false
    }).addTo(map);

    return () => {
      if (routingControl && map.hasLayer(routingControl)) {
        if (routingControl.getPlan()) {
          routingControl.getPlan().setWaypoints([]); // Clear existing waypoints
        }
        map.removeLayer(routingControl);
      }
    };
  }, [map]);

  return null;
}