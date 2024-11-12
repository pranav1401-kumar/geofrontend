import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const MapView = ({ geoData }) => {
  const mapRef = useRef(null);
  const featureGroupRef = useRef(null);

  useEffect(() => {
    // Cleanup function to properly dispose of the map instance
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleCreated = (e) => {
    const { layer } = e;
    if (featureGroupRef.current) {
      const drawnItems = featureGroupRef.current.getLayers();
      console.log('Created layer:', layer.toGeoJSON());
      console.log('All layers:', drawnItems.map(l => l.toGeoJSON()));
    }
  };

  const handleEdited = (e) => {
    const { layers } = e;
    layers.eachLayer((layer) => {
      if (layer) {
        console.log('Edited layer:', layer.toGeoJSON());
      }
    });
  };

  const handleDeleted = (e) => {
    const { layers } = e;
    layers.eachLayer((layer) => {
      if (layer) {
        console.log('Deleted layer:', layer.toGeoJSON());
      }
    });
  };

  return (
    <div style={{ height: '70vh', width: '100%' }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        whenReady={(map) => {
          mapRef.current = map.target;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            onEdited={handleEdited}
            onDeleted={handleDeleted}
            draw={{
              rectangle: true,
              polygon: true,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default MapView;