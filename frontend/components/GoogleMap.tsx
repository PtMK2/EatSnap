import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

type Place = {
    id: string;
    name: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    // 他に必要なプロパティがあればここに追加します
  };

  type ApiResponse = {
    results: Array<{
      place_id: string;
      name: string;
      geometry: {
        location: {
          lat: number;
          lng: number;
        };
      };
    }>;
  };

const GoogleMapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(center);
  const [places, setPlaces] = useState<Place[]>([]);
  
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }
    );
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }
    );
  }, []);

  useEffect(() => {
    if (currentLocation.lat !== center.lat) {
      fetchPlaces();
    }
  }, [currentLocation]);

  const fetchPlaces = async () => {
    try {
      // バックエンドのエンドポイントにリクエストを送る
      const response = await fetch(`http://localhost:8080/api/places?lat=${currentLocation.lat}&lng=${currentLocation.lng}&radius=5000&type=restaurant&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}}`);
      if (!response.ok) {
        throw new Error('Error fetching places');
      }
      const data: ApiResponse = await response.json();
       // レスポンスデータのログ出力
      console.log("API Response:", data);
      // 型の安全性を保つために、取得したデータをPlace型に変換
      const fetchedPlaces: Place[] = data.results.map(item => ({
        id: item.place_id, // Google Places APIの結果に応じて適切なプロパティ名を使用
        name: item.name,
        geometry: item.geometry,
      }));
      // マッピング後のデータのログ出力
      console.log("Mapped Places:", fetchedPlaces);

      setPlaces(fetchedPlaces);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };
  

  return (
    <div>
      <button onClick={getLocation}>現在地を取得</button> {/* 現在地を取得するボタン */}
      
      <div className="map-container">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={10}
          >
            {places.map((place) => (
              <Marker key={place.id} position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* その他のコンポーネント... */}
    </div>
  );
};

export default React.memo(GoogleMapComponent)
