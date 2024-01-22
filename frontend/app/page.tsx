"use client"

import React, { useState, useEffect } from 'react';
import {CssBaseline, Grid} from '@mui/material';
import HomeBar from '../components/HomeBar/Homebar';
import List from '../components/List/List';
import Map from '../components/Map/Map';
import { getPlacesData } from '../api/index';
import Autocomplete from '@/components/GoogleMap';

export default function Home() {
    type Place = {
      name: string;
      rating: number;
      num_reviews: number;
      // 必要に応じて他のプロパティを追加...
    };


    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState<number>(0);
  
    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState(null);
  
    const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
  
    const [autocomplete, setAutocomplete] = useState<typeof Autocomplete | null>(null);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
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
        getPlacesData(type, bounds?.sw, bounds?.ne)
          .then((data) => {
            setPlaces(data.filter((place: { name: any; num_reviews: number; }) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setRating(0);
            setIsLoading(false);
          });
      }
    }, [bounds, type]);
  
    const onLoad = (autoC: React.SetStateAction<Place[]>) => setAutocomplete(autoC);
  
    const onPlaceChanged = () => {
      const lat = autocomplete?.getPlace()?.geometry?.location?.lat();
      const lng = autocomplete?.getPlace().geometry.location.lng();
  
      setCoords({ lat, lng });
    };
  
    return (
      <>
        <CssBaseline />
        <Headers onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
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
  