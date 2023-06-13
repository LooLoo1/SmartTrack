import { createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "../../../../apollo-client";
import { LOGIN } from "../../../../apollo-client/mutation";
import { AuthResponse, ErrorResponse, LoginPayload } from "../types";

export const login = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: ErrorResponse }>(
	"auth/login",
	async (payload: LoginPayload, { rejectWithValue }) => {
		try {
			const { data } = await client.mutate({
				mutation: LOGIN,
				variables: { email: payload.email, password: payload.password },
			});

			return data.login;
		} catch (error) {
			return rejectWithValue({ message: String(error) });
		}
	},
);
