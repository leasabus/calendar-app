//Mensajes del calendario en español , aqui podemos poder todos los lenguajes que queremos
//sportar
export const getMessagesES = () => {
    return {
        allDay: 'Todo el día',
        previous: '<',
        next: '>',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: 'No hay eventos en este rango',
        showMore: total => `+ Ver más (${total})`
    };
}