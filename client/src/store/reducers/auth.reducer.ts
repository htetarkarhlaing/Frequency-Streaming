import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface IAuthPayload {
	status: boolean;
	token: string;
	valid: boolean;
	user: {
		name: string;
		email: string;

		image: string;
	};
}

interface IAuthState {
	value: IAuthPayload;
}

const initialState: IAuthState = {
	value: {
		status: false,
		token: "",
		valid: false,
		user: {
			name: "",
			email: "",
			image: "",
		},
	},
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IAuthPayload>) => {
			const { token, user, status, valid } = action.payload;
			state.value = {
				status: status,
				token,
				valid: valid,
				user: user,
			};
		},
		logout: (state) => {
			state.value = {
				user: {
					name: "",
					email: "",
					image: "",
				},
				status: true,
				token: "",
				valid: false,
			};
			Cookies.remove("token");
			Cookies.remove("refresh-token");
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
