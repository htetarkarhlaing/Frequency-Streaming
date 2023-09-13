import { Navigate, useRoutes } from "react-router-dom"
import Home from "../pages/home"
import Broadcast from "../pages/broadcast"

const Auth = () => {
    return useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "broadcast",
            element: <Broadcast />,
        },
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ])
}

export default Auth