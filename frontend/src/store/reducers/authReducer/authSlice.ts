import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { login } from "./actionCreators";
import { AuthResponse, AuthState } from "./types";

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	loading: false,
	error: null,
};

const localStorageKey = "authState"; // Key for storing data in localStorage

// Retrieve the persisted state from localStorage, if available
const persistedState = localStorage.getItem(localStorageKey);
const parsedState = persistedState ? JSON.parse(persistedState) : null;

// При сет роби запит на перевірку? parsedState.auth
// id, role

const initialAuthState = parsedState ? parsedState.auth : initialState;

const authSlice = createSlice({
	name: "auth",
	initialState: initialAuthState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;

			localStorage.removeItem(localStorageKey);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.loading = false;
				state.error = null;

				// Persist the updated state in localStorage
				localStorage.setItem(localStorageKey, JSON.stringify({ auth: state }));
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message ?? "Unknown error";
			});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
