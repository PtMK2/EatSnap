"use client"

import React, { useState, useEffect } from 'react';
import {CssBaseline, Grid} from '@mui/material';
import HomeBar from '../components/HomeBar/Homebar';
import List from '../components/List/List';
import Map from '../components/Map/Map';
import { getPlacesData } from '../api/index';

interface Coords {
    lat: number;
    lng: number;
  }
  
interface Bounds {
    sw: Coords;
    ne: Coords;
  }
  
interface Place {
    name: string;
    rating: number;
    num_reviews: number;
  }

export default function Home() {
    const [type, setType] = useState<string>('restaurants');
    const [rating, setRating] = useState<number>(0);
  
    const [coords, setCoords] = useState<Coords>({ lat: 0, lng: 0 });
    const [bounds, setBounds] = useState<Bounds | null>(null);

    const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
  
    const [autocomplete, setAutocomplete] = useState(null);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      });
    }, []);
  
    useEffect(() => {
      const filtered = places.filter((place) => Number(place.rating) > rating);
    
      setFilteredPlaces(filtered);
    }, [rating]);
  
    useEffect(() => {
      if (bounds) {
        setIsLoading(true);
  
        //緯度経度を指定して、その範囲内のレストラン情報を取得する　だが、緯度経度データをどこから持ってきているかが分からない
        getPlacesData(type, bounds.sw, bounds.ne)
          .then((data) => {
            setPlaces(data.filter((place: { name: string; num_reviews: number; }) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setRating(0);
            setIsLoading(false);
          });
      }
    }, [bounds, type, coords]);
  
    const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
    if (autocomplete) {
        const place = autocomplete.getPlace();
    if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        if (lat && lng) {
            setCoords({ lat, lng });
        }
    }
  }
};

  
    return (
      <>
        <CssBaseline />
        <HomeBar onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
        <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs={12} md={4}>
            <List
              isLoading={isLoading}
              childClicked={childClicked}
              places={filteredPlaces.length ? filteredPlaces : places}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Map
              setChildClicked={setChildClicked}
              setBounds={setBounds}
              setCoords={setCoords}
              coords={coords}
              places={filteredPlaces.length ? filteredPlaces : places}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  