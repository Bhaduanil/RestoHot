import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading ,darkmode,weatherData}) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4" style={{color:`${darkmode}`=='white'?'black':'white'}}>Restaurants, Hotels & Attractions around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="3rem" style={{color:'brown'}} />
        </div>
      ) : (
        <>
        <div style={{ display:'flex'}}>
          <FormControl className={classes.formControl}>
            <InputLabel id="type" style={{color:`${darkmode}`=='white'?'black':'white'}}>Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)} style={{color:`${darkmode}`=='white'?'black':'white'}} >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} >
            <InputLabel id="rating" style={{color:`${darkmode}`=='white'?'black':'white'}}>Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} style={{color:`${darkmode}`=='white'?'black':'white'}}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <div style={{backgroundColor:'brown',borderRadius:'10px',justifyContent:'center',textAlign:'center', marginBottom:'20px'}}>
          <div style={{marginBottom:'-30px',marginTop:'-10px',color:'white',color:'orange'}}><h4>Weather</h4></div>
            <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} height="70px"></img> 
            <div style={{marginTop:'-40px',marginBottom:'-15px'}}><h4>{weatherData.main}</h4></div>
          </div>
          </div>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} darkmode={darkmode}/>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;