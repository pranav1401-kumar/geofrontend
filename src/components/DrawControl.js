import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

export function DrawControl() {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Initialize draw controls
        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        const drawControl = new L.Control.Draw({
            draw: {
                polygon: true,
                rectangle: true,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false
            },
            edit: {
                featureGroup: drawnItems,
                remove: true
            }
        });

        map.addControl(drawControl);

        // Event handlers
        map.on(L.Draw.Event.CREATED, (e) => {
            const layer = e.layer;
            drawnItems.addLayer(layer);
            console.log('Shape created:', layer.toGeoJSON());
        });

        map.on(L.Draw.Event.EDITED, (e) => {
            const layers = e.layers;
            layers.eachLayer((layer) => {
                console.log('Shape edited:', layer.toGeoJSON());
            });
        });

        // Cleanup
        return () => {
            map.removeControl(drawControl);
            map.removeLayer(drawnItems);
            map.off(L.Draw.Event.CREATED);
            map.off(L.Draw.Event.EDITED);
        };
    }, [map]);

    return null;
}
