import { useState, useEffect } from "react"
import Cookies from "js-cookie";
import { login as ReduxLogin, logout as ReduxLogout } from "../store/reducers/auth.reducer"
import { useAppDispatch, useAppSelector } from "../store"
import { validateAccessToken as APIValidateAccessToken } from "../api/auth"
import { ILogin } from "../@types/IAuthResponse"

const Routes = () => {
    const dispatch = useAppDispatch();

    const authState = useAppSelector(state => state.auth.value)
    const [tokens, setTokens] = useState({
        accessToken: "",
        refreshToken: ""
    })

    const cookieAccessToken = Cookies.get("accessToken") || "";
    const cookieRefreshToken = Cookies.get("refreshToken") || "";

    // handlers
    const validateAccessToken = async (accessToken: string, refreshToken: string) => {
        APIValidateAccessToken(accessToken).then(res => {
            if (res.status === 200) {
                dispatch(ReduxLogin({
                    user: {
                        name: "",
                        email: "",
                        image: ""
                    },
                    status: true,
                    token: "",
                    valid: true
                }))
            }
            else {
                validateRefreshToken(refreshToken)
            }
        }).catch(err => {
            dispatch(ReduxLogout())
            console.log(err)
        })
    }

    const validateRefreshToken = async (refreshToken: string) => {
        APIValidateAccessToken(refreshToken).then(res => {
            if (res.status === 200) {
                const data: ILogin = res.data
                Cookies.set("accessToken", data.body.accessToken)
                Cookies.set("refreshToken", data.body.refreshToken)
            }
            else {
                dispatch(ReduxLogout())
            }
        }).catch(err => {
            dispatch(ReduxLogout())
            console.log(err)
        })
    }

    // effects
    useEffect(() => {
        if (tokens.accessToken !== "") {
            validateAccessToken(tokens.accessToken, tokens.refreshToken)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokens.accessToken])

    useEffect(() => {
        if (cookieAccessToken !== "" && cookieRefreshToken !== "") {
            setTokens({
                accessToken: cookieAccessToken,
                refreshToken: cookieRefreshToken
            })
        }
    }, [cookieAccessToken, cookieRefreshToken])

    if (!authState.status) {
        return <Loading />
    }
    else {
        if (authState.valid) {
            return <AuthRoute />
        }
        else {
            return <GuestRoute />
        }
    }
}

const AuthRoute = () => {
    return <div>Auth</div>
}

const GuestRoute = () => {
    return <div>UnAuth</div>
}

const Loading = () => {
    return <div>Loading...</div>
}
export default Routes