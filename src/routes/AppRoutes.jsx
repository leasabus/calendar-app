import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"


export const AppRoutes = () => {

    //funcion para la condicion de rutas privadas
    const authStatus = 'authenticated';
    //Si no esta autenticado va al login, si lo esta le mostramos el calendar
    return (
        <>
            <Routes>
                {
                    (authStatus === 'not-authenticated')
                        ? <Route path="/auth/*" element={<LoginPage />} />
                        : <Route path="/*" element={<CalendarPage />} />
                }


                {/* si el usuario intenta ir a cualquier ruta , lo manda al login */}
                <Route path="/*" element={<Navigate to="/auth/login" />} />
            </Routes >
        </>
    )
}
