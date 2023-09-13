import axios from "axios";
import { authJsonHeader, plainJsonHeader } from "../headers";

const URL = import.meta.env.VITE_REACT_APP_BACKEND_SERVER;

export const validateAccessToken = async (token: string) => {
	return axios({
		url: `${URL}/api/auth/who-am-i`,
		method: "GET",
		headers: authJsonHeader(token),
	});
};

export const validateRefreshToken = async (token: string) => {
	return axios({
		url: `${URL}/api/auth/refresh-tokens`,
		method: "GET",
		headers: authJsonHeader(token),
	});
};

interface ILogin {
	email: string;
	password: string;
}

export const login = async ({ email, password }: ILogin) => {
	return axios({
		url: `${URL}/api/auth/login`,
		method: "POST",
		headers: plainJsonHeader(),
		data: {
			email: email,
			password: password,
		},
	});
};

interface IRegister {
	email: string;
	name: string;
}

export const register = async ({ email, name }: IRegister) => {
	return axios({
		url: `${URL}/api/user/register`,
		method: "POST",
		headers: plainJsonHeader(),
		data: {
			email: email,
			name: name,
		},
	});
};

interface IConfirm {
	token: string;
	password: string;
}

export const confirm = async ({ token, password }: IConfirm) => {
	return axios({
		url: `${URL}/api/user/confirm`,
		method: "POST",
		headers: plainJsonHeader(),
		data: {
			token: token,
			password: password,
		},
	});
};
