import { useCalendarStore } from "../../hooks/useCalendarStore"

export const FabDelete = () => {
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDeleteEvent = () => {
        startDeletingEvent()
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDeleteEvent}
            style={{ display: hasEventSelected ? '' : 'none' }}>
            <i className="fa fa-trash-alt"></i>
        </button>
    )
}
