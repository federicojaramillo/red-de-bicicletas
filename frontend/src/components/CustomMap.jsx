import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../App.css';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import bicicletaContext from '../context/bicicletas/bicicletaContext';


// initial location on map
const position = [6.200647, -75.579074];

function createData( id, numero, color, modelo, array ) {
  let ubicacion = array.map(Number);
  return { id, numero, color, modelo, ubicacion };
}

function createRows( bicicletas ) {
  const rows = bicicletas.map((bicicleta) => { 
      return createData(bicicleta['id'], bicicleta['numero'], bicicleta['color'], bicicleta['modelo'], bicicleta['ubicacion'].split(','));
  });
  return rows;
}

const CustomMap = () => {

  const bicicletasContext = useContext(bicicletaContext);
  const { bicicletas, getBicicletas} = bicicletasContext;

  useEffect(() => {
      getBicicletas();
      
  }, []);

  // const pos0 = bicicletas[0].ubicacion
  // const pos1 = pos0.split(',')
  // console.log(pos1);
  // console.log(position);
  const rows = createRows(bicicletas);

  return(
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    <Typography component="h1" variant="h4" align="center">
        Mapa de las bicicletas
      </Typography>
    <MapContainer center={position} zoom={16} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {rows.map((bicicleta) => (
      <Marker position={bicicleta.ubicacion}>
       <Popup>
        {bicicleta.numero} <br /> {bicicleta.color} <br /> {bicicleta.modelo} <br />
      </Popup>
      </Marker>
          ))}

  </MapContainer>
          </Paper>
          </Container>
  );
};

export default CustomMap;
