import React, { useReducer } from 'react';

import bicicletaReducer from './bicicletaReducer';
import bicicletaContext from './bicicletaContext';

import { BICICLETAS, ADD_BICICLETA, EDIT_BICICLETA, DELETE_BICICLETA } from '../../types';

const BicicletaState = props => {
    
    const initialState = {
        bicicletas : []
    }

    const [ state, dispatch ] = useReducer(bicicletaReducer, initialState)

    const url = process.env.REACT_APP_URL;

    const addBicicleta = async ( formData ) => {

        const data = {
            numero: formData.numero,
            color: formData.color,
            modelo: formData.modelo,
            ubicacion: formData.ubicacion
        }

        const responseAddBicicleta = await fetch(url, 
                                                { method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(data)
                                                });
        
        const resultAddBicicleta = await responseAddBicicleta.json();    
        console.log(resultAddBicicleta);                                    

        dispatch({
            type: ADD_BICICLETA
        })
    }

    const getBicicletas = async () => {

        try {

            const responseBicicletas = await fetch(url, { method: 'GET' });
            const bicicletas = await responseBicicletas.json();

            dispatch({
                type: BICICLETAS,
                payload: bicicletas
            })
            
        } catch (error) {
            console.log(error);
        }

    }

    const editBicicleta = async ( bicicleta_id, formData ) => {

        try {

            const data = {
                numero: formData.numero,
                color: formData.color,
                modelo: formData.modelo,
                ubicacion: formData.ubicacion
            }

            const edit_url = url + '/' + bicicleta_id;
            
            const responseEditBicicleta = await fetch(edit_url, 
                            { method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                            });

            const resultEditBicicleta = await responseEditBicicleta.json();      

            console.log(resultEditBicicleta);   
            dispatch({
                type: EDIT_BICICLETA
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBicicleta = async ( bicicleta_id ) => {

        try {

            const delete_url = url + '/' + bicicleta_id;

            console.log(delete_url);
            console.log("i wanna die");
            
            const responseDeleteBicicleta = await fetch(delete_url, { method: 'DELETE' });

            const resultDeleteBicicleta = await responseDeleteBicicleta.json();     
            console.log(resultDeleteBicicleta);    
            console.log("lol");    

            dispatch({
                type: DELETE_BICICLETA
            })
            
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <bicicletaContext.Provider
            value={{
                bicicletas: state.bicicletas,
                selected_bicicleta: state.selected_bicicleta,
                addBicicleta: addBicicleta,
                getBicicletas: getBicicletas,
                editBicicleta: editBicicleta,
                deleteBicicleta: deleteBicicleta
            }}
        >
            {props.children}
        </bicicletaContext.Provider>
    )

}

export default BicicletaState;