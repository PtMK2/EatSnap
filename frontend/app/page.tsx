"use client"

import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import HomeBar from '../components/HomeBar/Homebar';
import List from '../components/List/List';
import Map from '../components/Map/Map';

export default function Home() {
    const [showList, setShowList] = useState(false);

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
                    <Map />
                </Grid>
            </Grid>
            <HomeBar />
        </>
    );
}
