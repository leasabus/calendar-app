import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
const temporalEvent =
{
    _id: new Date().getTime(),
    title: 'Cumpleaños de Lea',
    notes: 'Hay que comprar cerveza',
    start: new Date(),
    end: addHours(new Date(), 4),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Leandro'
    }
}


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [temporalEvent],
        activeEvent: null
    },
    //lo que queremos es q al clickear el evento de calendario se muestre activo
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        //creamos el reducer para guardar notas
        onAddNewEvent: (state, { payload }) => {
            //hacemos un push de un nuevo evento y le asignamos la accion con el payload
            state.events.push(payload)
            //una vez q creo la nota, voy a cerrar el evento
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            //recorro el objeto y devuelvo uno nuevo con map
            state.events = state.events.map(event => {
                //en caso de q el id del evento sea igual al id del payload
                //(osea q el evento ya existe y tiene un id) devuelvo un nuevo evento editado
                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            })
        },
        //ELIMINAR EVENTOS
        onDeleteEvent: (state) => {
            //voy a regresar todos los eventos que sean diferentes al id activo
            //al activo lo vamos a eliminar del array
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
            //Si el evento activo es true el boton tiene su funcionalidad, de lo contrario
            //no hace nada
        }
    }
});
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;