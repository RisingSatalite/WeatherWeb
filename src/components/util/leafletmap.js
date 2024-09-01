'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet

export default function LeafletMap({ positions }) {
  
  // Function to create a custom div icon based on position.label
  const createCustomDivIcon = (label) => {
    return new L.DivIcon({
      html: `<div style="background-color: #000; color: #fff; padding: 5px 10px; border-radius: 5px; white-space: nowrap;">${label}</div>`,
      className: 'custom-div-icon',
      iconSize: [30, 42], // Adjust as needed
      iconAnchor: [15, 42],
    });
  };

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {positions.map((position, index) => (
          <Marker 
            key={index} 
            position={[position.lat, position.lng]} 
            icon={createCustomDivIcon(position.label)} // Pass the label to the icon creation function
          >
            <Popup>{position.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
