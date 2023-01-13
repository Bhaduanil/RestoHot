import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';


import useStyles from './styles.js';

const Header = ({ onPlaceChanged, onLoad ,darkmode,setDarkmode,coords,setCoords}) => {
  const classes = useStyles();
const [mode,setMode]=useState(true);

const [finder,setFinder]=useState('');
const modeselect=()=>{
  setMode(!mode);
  mode?setDarkmode('white'):setDarkmode('#22303C')
  
}
const locationfinder=()=>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${finder}&APPID=c5683b302c632e36712b8bf1043fb4ea&units=metric`)
  .then((data) => data.json()).then((out) => {
      
      if(out.message=="city not found")
      {
           setFinder('City not found');
      }
      else{
      const latitude=out.coord.lat;
      const longitude=out.coord.lon;
      console.log(latitude);
      setCoords({lat:latitude,lng:longitude});
      }})}

  return (
    <AppBar position="fixed" >
      <Toolbar className={classes.toolbar} style={{backgroundColor:`${darkmode}`=='white'?'#A52A2A':'#15202B'}}>
        <Typography variant="h5" className={classes.title} style={{fontWeight:'bold'}}>
          RestoHot
        </Typography>
        <Box display="flex" justifyContent={'space-between'}>
          <Typography variant="h6" className={classes.title}>
            Search Location
          </Typography>
           <div className={classes.search}>
              <input placeholder="Search…" type="text" style={{paddingTop:'12px',height:'100%',borderColor:'brown',color:'black',fontWeight:'bold'}} onChange={(e)=>{
                console.log(e.target.value);
                setFinder(e.target.value)}} />
               <button onClick={locationfinder} style={{backgroundColor:'brown',color:'white',borderColor:'brown'}}><SearchIcon/></button>
              
            </div>
          <Switch defaultChecked onClick={modeselect}/>
        </Box>
       
      </Toolbar>
    </AppBar>
  );
};

export default Header;