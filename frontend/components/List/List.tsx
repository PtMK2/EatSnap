import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, Select } from '@mui/material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import { Title, Search, SearchIcon, InputRoot, InputInput, Toolbar } from './ListStyle.js';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }: { places: Array<any>, type: string, setType: Function, rating: number, setRating: Function, childClicked: string, isLoading: boolean }) => {

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill(null).map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <Toolbar>
      <Typography variant="h4">Food & Dining around you</Typography>
      {isLoading ? (
        <SearchIcon>
          <CircularProgress size="5rem" />
        </SearchIcon>
      ) : (
        <>
          <Search>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </Search>
          <Search>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </Search>
          <Grid container spacing={3}>
            {places?.map((place,i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Toolbar>
  );
};

export default List;