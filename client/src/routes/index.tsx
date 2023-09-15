import { useState, useEffect } from "react"
import Cookies from "js-cookie";
import { Spinner } from "@nextui-org/react";
import { login as ReduxLogin, logout as ReduxLogout } from "../store/reducers/auth.reducer"
import { useAppDispatch, useAppSelector } from "../store"
import { validateAccessToken as APIValidateAccessToken } from "../api/auth"
import { ILogin, IWhoAmI } from "../@types/IAuthResponse"
import Auth from "./Auth";
import Guest from "./Guest";

const Routes = () => {
    const dispatch = useAppDispatch();

    const authState = useAppSelector(state => state.auth.value)
    const [tokens, setTokens] = useState({
        accessToken: "",
        refreshToken: ""
    })

    const cookieAccessToken = Cookies.get("accessToken") || "";
    const cookieRefreshToken = Cookies.get("refreshToken") || "";
    const cookieSafeInfo = Cookies.get("save-me") || "";

    // handlers
    const validateAccessToken = async (accessToken: string, refreshToken: string) => {
        APIValidateAccessToken(accessToken).then(res => {
            if (res.status === 200) {
                const resData: IWhoAmI = res.data;
                dispatch(ReduxLogin({
                    user: {
                        name: resData.body.Profile.name,
                        email: resData.body.email,
                        image: resData.body.Profile.image || ""
                    },
                    status: true,
                    token: accessToken,
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
                if (cookieSafeInfo === "true") {
                    Cookies.set("refreshToken", data.body.refreshToken)
                }

                APIValidateAccessToken(data.body.accessToken).then(res => {
                    if (res.status === 200) {
                        const resData: IWhoAmI = res.data;
                        dispatch(ReduxLogin({
                            user: {
                                name: resData.body.Profile.name,
                                email: resData.body.email,
                                image: resData.body.Profile.image || ""
                            },
                            status: true,
                            token: data.body.accessToken,
                            valid: true
                        }))
                    }
                    else {
                        alert("not found")
                        dispatch(ReduxLogout())
                    }
                }).catch(err => {
                    alert("err")
                    console.log(err)
                    dispatch(ReduxLogout())
                })
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
    }, [tokens.accessToken, tokens.refreshToken])

    useEffect(() => {
        if (cookieAccessToken !== "" || cookieRefreshToken !== "") {
            setTokens({
                accessToken: cookieAccessToken,
                refreshToken: cookieRefreshToken
            })
        }
        else {
            dispatch(ReduxLogout())
        }

    }, [cookieAccessToken, cookieRefreshToken])

    if (!authState.status) {
        return <Loading />
    }
    else {
        if (authState.valid) {
            return <Auth />
        }
        else {
            return <Guest />
        }
    }
}

const Loading = () => {
    return <div className="w-screen h-screen flex items-center justify-center">
        <Spinner size="lg" />
    </div>
}
export default Routes