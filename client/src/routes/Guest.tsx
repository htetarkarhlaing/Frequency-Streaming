import { Navigate, useRoutes } from "react-router-dom"
import Confirm from "../pages/confirm"
import Landing from "../pages/landing"

const Guest = () => {
    return useRoutes([
        {
            path: "/",
            element: <Landing />,
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