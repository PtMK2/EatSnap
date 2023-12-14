"use client"
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const GoogleMapComponent = () => {
  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            />
        </LoadScript>
    );
};

export default GoogleMapComponent;

