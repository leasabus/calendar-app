
//este componente se va a encargar de customizar nuestros cards de eventos
export const CalendarEvent = ({ event }) => {
    const { title, user } = event;
    return (
        <div>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </div>
    )
}
