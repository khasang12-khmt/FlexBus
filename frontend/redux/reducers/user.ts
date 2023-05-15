import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthday: string;
  name: string;
  accessTokenStore: string | null;
}

const initialState: UserState = {
  id: "",
  email: "",
  phoneNumber: "",
  gender: "",
  birthday: "",
  name: "",
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
    setUser: (state, action: PayloadAction<UserState>) => {
      // state.id = action.payload.id;
      // state.email = action.payload.email;
      // state.phoneNumber = action.payload.phoneNumber;
      // state.gender = action.payload.gender;
      // state.birthday = action.payload.birthday;
      state = action.payload;
    },
    clearUser: (state, action: PayloadAction<UserState>) => {
      // state.id = "";
      // state.email = "";
      // state.phoneNumber = "";
      // state.gender = "";
      // state.birthday = "";
      state = initialState;
    },
    setAccessTokenStore: (state, action: PayloadAction<string | null>) => {
      // state.id = "";
      // state.email = "";
      // state.phoneNumber = "";
      // state.gender = "";
      // state.birthday = "";
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
  setUser,
  clearUser,
  setAccessTokenStore,
} = userSlice.actions;

export default userSlice.reducer;
