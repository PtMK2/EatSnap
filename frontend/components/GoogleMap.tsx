"use client"
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 40px)', // 40pxはフッターの高さ分を差し引いた高さ
};

const GoogleMapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // ユーザーの現在の位置を取得
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []); // この Effect は最初のレンダリング時にのみ実行されます

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={15}
      >
        {/* マーカーで現在位置を表示 */}
        <Marker position={currentLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;