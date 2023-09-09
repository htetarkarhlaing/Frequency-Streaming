import { useState, useEffect } from "react"
import Cookies from "js-cookie";
import axios from "axios";

const Routes = () => {

    const [token, setToken] = useState<string | null>(null);
    const [authState, setAuthState] = useState({
        isValidated: false,
        isAuthenticated: false
    })

    const cookieToken: string = Cookies.get("token") || "";

    // * cookie buffer effect
    useEffect(() => {
        setToken(cookieToken)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // * validator effect
    useEffect(() => {
        if (token !== null && token === "") {
            setAuthState({
                isValidated: true,
                isAuthenticated: false
            })
        }
        else {
            if (token && token !== "") {
                tokenValidator(token)
            }
        }
    }, [token])

    // * validation handler
    const tokenValidator = (payload: string) => {
        axios.get('', {
            headers: {
                Authorization: `Bearer ${payload}`
            }
        })
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    if (!authState.isValidated) {
        return <Loading />
    }
    else {
        if (authState.isAuthenticated) {
            return <AuthRoute />
        }
        else {
            return <GuestRoute />
        }
    }
}

const AuthRoute = () => {
    return <div>Hello</div>
}

const GuestRoute = () => {
    return <div>Hello</div>
}

const Loading = () => {
    return <div>Loading...</div>
}
export default Routes