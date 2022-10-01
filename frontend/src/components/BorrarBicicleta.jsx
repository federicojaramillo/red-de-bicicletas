import React from 'react';
import Button from '@mui/material/Button';


const BorrarBicicleta = ({ deleteBicicleta, bicicleta_id }) => {

  const handleDelete = e => {
    e.preventDefault();
    deleteBicicleta(bicicleta_id);
    window.location.reload(true); 
  };

  return (
      <Button onClick={handleDelete}>
        Borrar
      </Button>
  );
}

export default BorrarBicicleta;