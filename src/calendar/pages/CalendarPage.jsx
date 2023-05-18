import { useState } from "react"
import { CalendarEvent, CalendarModal, NavBar, FabAddNew, FabDelete } from "../components"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from "../../helpers"
import { useCalendarStore, useUiStore } from "../../hooks"



//Creamos el evento que aparece en la card del calendario

export const CalendarPage = () => {
    const { openDateModal } = useUiStore()
    const { events, setActiveEvent } = useCalendarStore()
    //definimos un state para guardar los eventos de calendario en local storage
    //Si no tenemos nada en el local, lo devolvemos a week
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')


    //capturamos los eventos del calendario en consola
    const eventStylesGetter = () => {

        //podemos modificar los estilos de esta manera
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }
    //Funcionoes para emitir eventos onClick
    const onDoubleClick = (event) => {
        console.log({ doubleClick: event })
        openDateModal();
    }
    const onSelect = (event) => {
        console.log({ click: event })
        setActiveEvent(event)
    }
    //Funcion para cuando cambiamos de vista
    const onViewChanges = (event) => {
        localStorage.setItem('lastView', event)
        setLastView(event)
    }


    return (
        <>
            <NavBar />

            <Calendar
                //pone el calendar en español
                culture="es"
                localizer={localizer}
                //evento creado
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                //calculamos el vh con lo que ocupa la navbar para q no sobre espacio
                messages={getMessagesES()}
                //eventos del calendario
                eventPropGetter={eventStylesGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanges}
                //a la vista por defecto le asignamos el estado con el local storage
                defaultView={lastView}
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
