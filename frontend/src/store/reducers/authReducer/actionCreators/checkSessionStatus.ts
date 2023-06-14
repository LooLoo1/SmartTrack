import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { checkSession } from "../../../../api/checkSession";

export const checkSessionStatus = createAsyncThunk("auth/checkSession", async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState() as RootState;
        const { token } = state.auth;
        
        const response = await checkSession(token);
        return response;
    } catch (error) {
        return rejectWithValue({ message: String(error) });
    }
});