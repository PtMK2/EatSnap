import React from "react";
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import useStyles from './style.js';
const HomeBar = () => {
    const classes = useStyles();
    
    return (
        <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                        <Typography variant="h5" className={classes.title}>
                            Trabel Advisor 
                        </Typography>
                        <Box display="flex">
                            <Typography>
                            Exprolore new places
                            </Typography>
                            <Autocomplete>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                                </div>
                            </Autocomplete>
                        </Box>

                </Toolbar>
        </AppBar>    
    );
}

export default HomeBar;