import {createBrowserRouter} from "react-router"
import {Root} from "../layouts/root.tsx";
import Home from "../pages/home";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {index: true, element: <Home/>}
        ]
    }

]);

export default routes;