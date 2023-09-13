import { Navigate, useRoutes } from "react-router-dom"
import Login from "../pages/login"
import Register from "../pages/register"
import Confirm from "../pages/confirm"
import Landing from "../pages/landing"

const Guest = () => {
    return useRoutes([
        {
            path: "/",
            element: <Landing />,
        },
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "register",
            element: <Register />,
        },
        {
            path: "confirm",
            element: <Confirm />,
        },
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ])
}

export default Guest