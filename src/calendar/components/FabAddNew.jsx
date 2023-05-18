import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {
    const { setActiveEvent } = useCalendarStore()
    const { openDateModal } = useUiStore()

    //Cuando abrimos un nuevo evento de calendario con el boton, queremos que sea uno nuevo,
    //y no el que ya esta cargado en la card de eventos
    const handleOpenModal = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 4),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Leandro'
            }
        });
        openDateModal();
    }

    return (
        <button className="btn btn-primary fab" onClick={handleOpenModal}>
            <i className="fas fa-plus"></i>
        </button>
    )
}
