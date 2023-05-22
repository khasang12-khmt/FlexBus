import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
  accessTokenStore: string | null;
}

const initialState: UserState = {
  id: "",
  email: "",
  accessTokenStore: null,
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
    clearUser: (state, action: PayloadAction<UserState>) => {
      state = initialState;
    },
    setAccessTokenStore: (state, action: PayloadAction<string | null>) => {
      state.accessTokenStore = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserEmail,
  clearUserEmail,
  setUserId,
  clearUserId,
  clearUser,
  setAccessTokenStore,
} = userSlice.actions;

export default userSlice.reducer;
