import {RouterProvider} from "react-router";
import routes from "./routes";
import {GlobalProvider} from "./context/GlobalContext.tsx";
import './app.css';
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <GlobalProvider>
                <RouterProvider router={routes}/>
            </GlobalProvider>
            <ToastContainer />
        </>
    )
}

export default App
