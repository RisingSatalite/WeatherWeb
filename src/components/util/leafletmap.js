'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; //Very important for map to look and be usable

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: require('path/to/your/icon.png'), // Path to your custom marker image
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor the icon
  popupAnchor: [1, -34], // Anchor for the popup
  shadowUrl: require('path/to/your/marker-shadow.png'), // Optional shadow image
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
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
                    <Marker key={index} position={[position.lat, position.lng]} icon={customIcon}>
                        <Popup>{label}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
  }
