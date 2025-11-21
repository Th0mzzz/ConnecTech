import {createBrowserRouter} from "react-router"
import {Root} from "../layouts/root.tsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: []
    }

]);

export default routes;