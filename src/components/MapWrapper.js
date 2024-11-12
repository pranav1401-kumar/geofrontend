import React, { useCallback, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import * as ReactLeaflet from 'react-leaflet';
import { DrawControl } from './DrawControl';

const { MapContainer, TileLayer, FeatureGroup } = ReactLeaflet;

const MapWrapper = ({ geoData }) => {
    const [map, setMap] = useState(null);

    // Initialize map when component mounts
    const initializedRef = useCallback(node => {
        if (node !== null) {
            setMap(node);
        }
    }, []);

    useEffect(() => {
        // Fix Leaflet icon issue
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
        });
    }, []);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <MapContainer
                ref={initializedRef}
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup>
                    <DrawControl />
                </FeatureGroup>
            </MapContainer>
        </div>
    );
};

export default MapWrapper;