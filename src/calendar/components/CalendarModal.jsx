import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";

import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks/uiSliceStore';
import { useCalendarStore } from '../../hooks';

registerLocale('es', es)


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
    const { activeEvent, startSavingEvent, } = useCalendarStore()

    const { isDateModalOpen, closeDateModal } = useUiStore()
    //estados para validar los campos de inputs
    const [isFormSubmitted, setFormSubmitted] = useState(false)

    //estado inicial del form
    const [form, setForm] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })


    //funcion para establecer el evento activo que declaramos en el slice cuando clickeamos
    useEffect(() => {
        //si el evento activo no es null esparcimos las propiedades y creamos un nuevo obj
        if (activeEvent !== null) {
            setForm({ ...activeEvent })
        }

    }, [activeEvent])


    //funcion para mostrar los campos del form validados o con error
    const titleClass = useMemo(() => {
        if (!isFormSubmitted) return;

        return (form.title.length > 0)
            ? ''
            : 'is-invalid';

    }, [form.title, isFormSubmitted])


    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true)
        //primero sacamos la dif en seg entre las dos fechas
        const difference = differenceInSeconds(form.end, form.start)
        console.log(difference)
        //si no es un number o las fechas son iguales tenemos un error
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return;
        }
        //si no ingresa un titulo no hacemos nada
        if (form.title.length <= 0) {
            return;
        }
        //si esta todo ok mandamos el evento
        console.log(form)

        //Creando un nuevo evento
        //le asignamos el estado incial del form
        startSavingEvent(form)
        onCloseModal()
        //lo cerramos una vez q se crea y volvemos a su estado inicial

    }


    const onInputChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }
    //funcion para cambiar la fecha, accedemos a los valores anteriores y al changing
    //le asingamos el evento
    const onDateChanged = (event, changing) => {
        setForm({
            ...form,
            [changing]: event
        })

    }

    const onCloseModal = () => {
        closeDateModal()
    }

    return (
        <div>
            <Modal
                isOpen={isDateModalOpen}
                onRequestClose={onCloseModal}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}

            >
                <h1> Nuevo evento </h1>
                <hr />
                <form className="container" onSubmit={onSubmit}>

                    <div className="form-group mb-2">
                        <label>Fecha y hora inicio</label>
                        <DatePicker
                            selected={form.start}
                            className='form-control'
                            onChange={(event) => onDateChanged(event, 'start')}
                            dateFormat="Pp"
                            locale="es"
                            showTimeSelect />
                    </div>

                    <div className="form-group mb-2">
                        <label>Fecha y hora fin</label>
                        {/* seleccionador de fechas */}
                        <DatePicker
                            minDate={form.start}
                            selected={form.end}
                            className='form-control'
                            onChange={(event) => onDateChanged(event, 'end')}
                            dateFormat="Pp"
                            locale="es"
                            showTimeSelect />
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${titleClass}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={form.title}
                            onChange={onInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group mb-2">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={form.notes}
                            onChange={onInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>

            </Modal>



        </div>
    )
}
