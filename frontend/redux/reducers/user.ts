import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
}

const initialState: UserState = {
  id: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearUserEmail: (state) => {
      state.email = "";
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    clearUserId: (state) => {
      state.id = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserEmail, clearUserEmail, setUserId, clearUserId } =
  userSlice.actions;

export default userSlice.reducer;
