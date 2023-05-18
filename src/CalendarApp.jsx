import { Provider } from "react-redux"
import { AppRoutes } from "./routes/AppRoutes"
import { store } from "./store/store"


export const CalendarApp = () => {
    return (
        <>
            <Provider store={store}>
                <AppRoutes />
            </Provider>

        </>
    )
}
