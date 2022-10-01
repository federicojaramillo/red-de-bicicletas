import { BICICLETAS, ADD_BICICLETA, EDIT_BICICLETA, DELETE_BICICLETA } from '../../types';

const bicicletaReducer = (state, action) => {
    switch(action.type) {

        case BICICLETAS:
            return {
                ...state,
                bicicletas: action.payload
            };

        case ADD_BICICLETA:
            return {
                ...state,
            };
        
        case EDIT_BICICLETA:
            return {
                ...state,
            };

        case DELETE_BICICLETA:
            return {
                ...state,
            };

        default:
            return 'Tipo desconocido';
    }
}

export default bicicletaReducer;