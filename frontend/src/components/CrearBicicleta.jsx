import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';



const CrearBicicleta = ({ addBicicleta }) => {
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState('');
    const [modelo, setModelo] = useState('');

    const handleChangeColor = (event) => {
        setColor(event.target.value);
      };

      const handleChangeModelo = (event) => {
        setModelo(event.target.value);
      };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setColor('');
    setModelo('');
    window.location.reload(true); 
  };

  const handleCreate = e => {
    e.preventDefault();
    let target = e.target;

    let formData = {};

    for (let i=0; i<target.length; i++) {
        if(target.elements[i].value && target.elements[i].getAttribute('id')) {
            formData[target.elements[i].getAttribute('id')] = target.elements[i].value;
        }
    }

    formData['color'] = color;
    formData['modelo'] = modelo;

    addBicicleta(formData);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Crear Bicicleta
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear Bicicleta</DialogTitle>
        <DialogContent>
        <form id="addForm" onSubmit={handleCreate} noValidate autoComplete="off">
        <TextField
                autoFocus
                required
                margin="dense"
                id="numero"
                label="ID"
                fullWidth
                variant="standard"
            />

<TextField
            variant="standard"
            fullWidth
            required
            select
            id="color"
            label="Color"
            value={color}
            onChange={handleChangeColor}
            >
            <MenuItem key={'rojo'} value={'rojo'}>Rojo</MenuItem>
            <MenuItem key={'azul'} value={'azul'}>Azul</MenuItem>
            <MenuItem key={'negro'} value={'negro'}>Negro</MenuItem>
            <MenuItem key={'morado'} value={'morado'}>Morado</MenuItem>
            <MenuItem key={'blaco'} value={'blanco'}>Blanco</MenuItem>
            </TextField>

            <TextField
            variant="standard"
            fullWidth
            required
            select
            id="modelo"
            label="Modelo"
            value={modelo}
            onChange={handleChangeModelo}
            >
            <MenuItem key={'urbana'} value={'urbana'}>Urbana</MenuItem>
            <MenuItem key={'ruta'} value={'ruta'}>Ruta</MenuItem>
            <MenuItem key={'bmx'} value={'bmx'}>BMX</MenuItem>
            <MenuItem key={'pista'} value={'pista'}>Pista</MenuItem>
            <MenuItem key={'todoterreno'} value={'todoterreno'}>Todoterreno</MenuItem>
            </TextField>

            
            <TextField
                required
                margin="dense"
                id="ubicacion"
                label="Ubicación"
                fullWidth
                variant="standard"
                helperText="Cordenadas. Ej: 6.200647,-75.579074 " 
            />
            
            
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' form='addForm'>Crear</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CrearBicicleta;