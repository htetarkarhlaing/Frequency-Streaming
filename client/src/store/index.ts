import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/auth.reducer";

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({ serializableCheck: false });
	},
	devTools: true,
});
const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { dispatch };
export default store;
