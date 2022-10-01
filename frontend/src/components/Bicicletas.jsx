import React, { useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import bicicletaContext from '../context/bicicletas/bicicletaContext';

import CrearBicicleta from "./CrearBicicleta";
import EditarBicicleta from "./EditarBicicleta";
import BorrarBicicleta from "./BorrarBicicleta";


const columns = [
    { id: 'numero', label: '#', minWidth: 170 },
    { id: 'color', label: 'Color', minWidth: 170 },
    { id: 'modelo', label: 'Modelo', minWidth: 170 },
    { id: 'ubicacion', label: 'Ubicacion', minWidth: 170 }
];

function createData( id, numero, color, modelo, ubicacion ) {
    return { id, numero, color, modelo, ubicacion };
}

function createRows( bicicletas ) {
    const rows = bicicletas.map((bicicleta) => { 
        return createData(bicicleta['id'], bicicleta['numero'], bicicleta['color'], bicicleta['modelo'], bicicleta['ubicacion']);
    });
    return rows;
}

const Bicicletas = () => {

    const bicicletasContext = useContext(bicicletaContext);
    const { bicicletas, addBicicleta, getBicicletas, editBicicleta, deleteBicicleta } = bicicletasContext;

    useEffect(() => {
        getBicicletas();
        
    }, []);
    const rows = createRows(bicicletas);
  return(
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
    <Table stickyHeader aria-label="sticky table">
        <TableHead>
        <TableRow>
              <TableCell align="left" colSpan={3}>
              <Typography variant="h4" color="inherit" >
                    Bicicletas
                </Typography>
              </TableCell>
              <TableCell align="right" colSpan={3}>
                <CrearBicicleta addBicicleta={ addBicicleta }/>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ top: 57, minWidth: 50 }}/>
              <TableCell style={{ top: 57, minWidth: 50 }}/>
            </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
            <TableRow
              key={row.numero}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{ minWidth: 170 }}>
                {row.numero}
              </TableCell>
              <TableCell  style={{ minWidth: 170 }}>{row.color}</TableCell>
              <TableCell   style={{ minWidth: 170 }}>{row.modelo}</TableCell>
              <TableCell style={{ minWidth: 170 }}>{row.ubicacion}</TableCell>
              <TableCell style={{ minWidth: 50 }}><EditarBicicleta editBicicleta={ editBicicleta } bicicleta={ row }/></TableCell>
              <TableCell  style={{ minWidth: 50 }}><BorrarBicicleta deleteBicicleta={ deleteBicicleta} bicicleta_id={ row.id } /></TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
          </Paper>
          </Container>
  );
};

export default Bicicletas;
