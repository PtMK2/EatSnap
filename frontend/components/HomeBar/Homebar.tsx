import React from 'react';
import { AppBar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete } from '@react-google-maps/api';
import { Toolbar, Title, Search, InputRoot, InputInput } from './HomeBarStyle';

const HomeBar = ({ onPlaceChanged, onLoad }: { onPlaceChanged: any, onLoad: any }) => {

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component={Title}>
            Travel Advisor
          </Typography>
          <Box display="flex">
            <Typography variant="h6" component={Title}>
              Explore new places
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Search>
                  <SearchIcon />
                <InputBase placeholder="Search…" components={{ Root: InputRoot, Input: InputInput }} />
              </Search>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
    );
}
export default HomeBar;