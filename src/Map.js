import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'

import './Map.css'


mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);
  const MapboxDirections = window.MapboxDirections
  const MapboxGeocoder = window.MapboxGeocoder

  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [25, 60],
      zoom: 5
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 
      'bottom-left');

    // Button for user location
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }), 'bottom-right'
    );

    // Display driving directions
    map.addControl(new MapboxDirections({
      accessToken: mapboxgl.accessToken
    }), 'top-right'
    );
      
    // Marker on searched location
    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    }), 'top-left'
    );

    // change cursor to pointer when hovers on feature
    map.on('mouseenter', e => {
      if (e.features.length) {
        map.getCanvas().style.cursor = 'pointer';
        }
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });


    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;