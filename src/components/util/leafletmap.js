'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap({ positions }) {

    return (
        <div>
            <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {positions.map((position, index) => (
                    <Marker key={index} position={[position.lat, position.lng]}>
                    <Popup>{position.label}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
  }