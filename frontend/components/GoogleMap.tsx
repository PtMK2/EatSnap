"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 40px)', // 40pxはフッターの高さ分を差し引いた高さ
};

const mapStyles = [
    {
        // すべての風景を非表示
        featureType: 'landscape',
        stylers: [{ visibility: 'off' }]
    },
    {   
        // 企業や店舗を表示します。
        featureType: 'poi.business', 
        stylers: [{ visibility: 'on' }]
    }
    
  ];

const GoogleMapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const mapOptions = {
    disableDefaultUI: true, // デフォルトのUIコントロールを非表示にする
  };

  // ピンがクリックされたときの処理
  const handleMarkerClick = async (placeId: any) => {
    // 2. クリックされたピンの place_id を使用して、関連する shop_id を取得
    try {
      const response = await axios.get(`/api/getShopIdByPlaceId?placeId=${placeId}`);
      const shopId = response.data.shopId;

      // 3. 取得した shop_id を使用して、データベースの comments テーブルからコメントを取得
      const commentsResponse = await axios.get(`/api/getCommentsByShopId?shopId=${shopId}`);
      const comments = commentsResponse.data.comments;

      // 4. 取得したコメントを画面に表示（実際の表示方法はアプリケーションによる）
      console.log(comments);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
        options={{ ...mapOptions, styles: mapStyles }} // マップオプションを適用
      >
        {/* マーカーで現在位置を表示 */}
        <Marker position={currentLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;