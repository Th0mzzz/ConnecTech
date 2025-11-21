import {RouterProvider} from "react-router";
import routes from "./routes";
import {GlobalProvider} from "./context/GlobalContext.tsx";
import './app.css';

function App() {
    return (
        <>
            <GlobalProvider>
                <RouterProvider router={routes}/>
            </GlobalProvider>
        </>
    )
}

export default App
