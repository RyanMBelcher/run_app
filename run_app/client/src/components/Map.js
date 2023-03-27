import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box } from '@chakra-ui/react'

export default function Map({ goal }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    useEffect(() => {
        if (loaded) {
            let map = new mapboxgl.Map({
                container: 'map',
                center: goal.currentLocation,
                zoom: 3,
                style: 'mapbox://styles/rbelcher86/clf4ixsl1006o01qkcxzpffm0',
                accessToken: 'pk.eyJ1IjoicmJlbGNoZXI4NiIsImEiOiJjbGYxOXBtMzkwMXE3M3dxa3FnMmI5dXd4In0.RSfTXdlifISPOcZ5xO5ucg'
            });

            map.addControl(
                new mapboxgl.NavigationControl());

            const start = new mapboxgl.Marker({ color: '#0B515B' })
                .setLngLat(goal.goalDefinition?.start)
                .addTo(map);

            const end = new mapboxgl.Marker({ color: '#0B515B' })
                .setLngLat(goal.goalDefinition?.end)
                .addTo(map);

            const currentLocation = new mapboxgl.Marker({ color: '#FDC500' })
                .setLngLat(goal.currentLocation)
                .addTo(map);

            map.on('load', () => {
                map.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                "type": "Feature",
                                "properties": {
                                    "stroke": "#ff1800"
                                },
                                "geometry": {
                                    "type": "LineString",
                                    "coordinates": goal.goalDefinition?.coordinates
                                }
                            }
                        ]
                    }
                });
                map.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#3BBDC6',
                        'line-width': 8
                    }
                });
            });
        }
    }, [loaded]);

    return (
        <Box id='map' className="map-container" w="100%" h="100%"></Box>
    )
}

