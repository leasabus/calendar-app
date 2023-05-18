import esES from 'date-fns/locale/es'
import { format, parse, startOfWeek, getDay } from "date-fns"
import { dateFnsLocalizer } from 'react-big-calendar'

const locales = {
    'es': esES,
}

//valores que vamos a utilizar de fns
export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})