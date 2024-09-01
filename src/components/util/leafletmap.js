'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; //Very important for map to look and be usable

// Create a custom icon
const customDivIcon = new L.DivIcon({
  html: '<div style="background-color: #000; color: #fff; padding: 5px; border-radius: 5px;">Custom Marker</div>',
  className: 'custom-div-icon',
  iconSize: [30, 42],
  iconAnchor: [15, 42]
});

export default function LeafletMap({ positions }) {

    return (
        <div>
            <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {positions.map((position, index) => (
                    <Marker key={index} position={[position.lat, position.lng]} icon={customDivIcon}>
                      <Popup>{label}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
  }
