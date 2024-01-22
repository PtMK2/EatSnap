// map.tsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Paper, useMediaQuery, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Rating from '@mui/lab/Rating';

import mapStyles from '../../app/mapStyles';
import useStyles from './style';

// プレイスオブジェクトの型定義
interface Place {
  latitude: number;
  longitude: number;
  name: string;
  photo?: {
    images: {
      large: {
        url: string;
      }
    }
  };
  rating: number;
}

// Mapコンポーネントのプロップスの型定義
interface MapProps {
  coords: { lat: number; lng: number };
  places: Place[];
  setCoords: (coords: { lat: number; lng: number }) => void;
  setBounds: (bounds: { ne: any; sw: any }) => void;
  setChildClicked: (child: string | number) => void;
}

const Map: React.FC<MapProps> = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={classes.mapContainer}>
      {isLoaded && (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={coords}
            zoom={14}
            options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
            onBoundsChanged={() => {
              // Boundsが変更されたときのロジック
            }}
          >
            {places.length > 0 && places.map((place, i) => (
              <Marker
              position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
              key={i}
                >
                {!matches
                  ? <CheckBoxOutlineBlankIcon color="primary" fontSize="large" />
                  : (
                    <Paper elevation={3} className={classes.paper}>
                      <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                      <img
                        className={classes.pointer}
                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                        alt={place.name}
                      />
                      <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                    </Paper>
                  )}
              </Marker>
            ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default Map;
