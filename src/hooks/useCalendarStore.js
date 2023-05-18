import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";



export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        //Esta funcion va a traer los eventos del backend
        //la tenemos q mandar a llamar desde el modal que inicia el evento

        //actualizar un evento
        if (calendarEvent._id) {
            //actualizando
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
        //creando un evento. esparcimos las props y creamos un nuevo obj de calendar
        //asignandole un id que luego va a venir desde el back
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent())
    }

    return {
        //prop
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //methods
        //muestra activo al evento cuando lo seleccionamos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}