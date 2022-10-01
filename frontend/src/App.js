import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CustomMap from "./components/CustomMap";
import GoogleLoginButton from "./components/GoogleLoginButton";
import Bicicletas from "./components/Bicicletas";

import BicicletaState from "./context/bicicletas/bicicletaState";


const theme = createTheme();

export default function App() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <BicicletaState>
    <AppBar position="relative">
    <Toolbar>
    <PedalBikeIcon sx={{ mr: 2 , ml: 4}} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Red de Bicicletas
          </Typography>
          <GoogleLoginButton/>
          <IconButton
            id="basic-button"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ mr: 4, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem component={Link} to="/" onClick={handleClose}>Mapa</MenuItem>
            <MenuItem component={Link} to="/bicicletas" onClick={handleClose}>Bicicletas</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<CustomMap />} />
        <Route exact path="/bicicletas" element={<Bicicletas/>} />
      </Routes>
          
      </BicicletaState>

  </ThemeProvider>
  );
}

