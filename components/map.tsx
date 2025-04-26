"use client";

import { startTracking } from "@/core/signalRService";
import { Button } from "@nextui-org/react";
import L from "leaflet";
import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lon: number;
}

type MapProps = {
  locations: Location[];
};

const Map: React.FC<MapProps> = ({ locations }) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  // inistialize Map
  useEffect(() => {
    const initialMap = L.map("map", {
      dragging: false,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      center: [51.505, -0.09],
      zoom: 13,
    });

    // Dark theme tile layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 17,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(initialMap);

    setMap(initialMap);

    return () => {
      initialMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    const carIcon = L.icon({
      iconUrl: "/car.png", // Use the imported URL 
      iconSize: [60, 28], // Size of the icon
      iconAnchor: [32, 30], // Adjust as needed based on your icon size
      popupAnchor: [0, -30], // Adjust for popups if needed
    });

    let newMarker;

    // Create new markers
    if (locations.length > 0) {

      // Remove existing markers
      markers.forEach((marker) => { 
        map.removeLayer(marker);
      });

      newMarker = L.marker(
        [
          locations[locations.length - 1].lat,
          locations[locations.length - 1].lon,
        ],
        { icon: carIcon }
      ).addTo(map);
      setMarkers([newMarker]);
    }

    // Draw polyline if locations are valid
    if (locations.length > 0) {
      const latLngs: L.LatLngTuple[] = locations.map(
        (loc) => [loc.lat, loc.lon] as L.LatLngTuple
      );
      const polyline = L.polyline(latLngs, { color: "#006fee" }).addTo(map);

      // Fit the map to the polyline bounds only if valid
      if (polyline.getLatLngs().length > 0) {
        map.fitBounds(polyline.getBounds());
      }
    }
  }, [map, locations]);

  return (
    <>
      <Button className="mb-5" color="primary" onClick={() => startTracking()}>
        Start Tracking
      </Button>
      <div id="map" style={{ width: "100%", height: "700px" , border: "1px solid"}} />
    </>
  );
};

export default Map;
