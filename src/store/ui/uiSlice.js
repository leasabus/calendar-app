//Mantiene la informacion de UI, por ejemplo saber si el modal esta abierto o cerrado
import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        //creamos un toggle para abrir y cerrar
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        }
    }
});
// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
