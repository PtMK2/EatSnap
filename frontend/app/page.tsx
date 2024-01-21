"use client"

import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import HomeBar from '../components/HomeBar/Homebar';
import List from '../components/List/List';
import Map from '../components/Map/Map';
import { getPlacesData } from '../api/index';
export default function Home() {
    const [showList, setShowList] = useState(false);

    const [places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds]           = useState(null);
    useEffect(() => {
        getPlacesData()
            .then((data: React.SetStateAction<never[]>) => {
                console.log(data);

                setPlaces(data);
        })
    
    }, []);


    // ボタンがクリックされたときのハンドラー
    const toggleList = () => {
        setShowList(!showList);
    };

    return (
        <>
            <CssBaseline />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <button onClick={toggleList}>Show List</button>
                    {showList && <List />}
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBOunds={setBounds}
                        coordinates={coordinates}/>
                </Grid>
            </Grid>
            <HomeBar />
        </>
    );
}
