import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  stripe_id: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, action) {
      // state.id = action.payload?.id;
      // state.name = action.payload?.name;
      // state.email = action.payload?.email;
      // state.phone = action.payload?.phone;
      // state.company = action.payload?.company;
      // state.stripe_id = action.payload?.stripe_id;
      const actionKeys = Object.keys(action.payload);
      actionKeys.forEach((key) => (state[key] = action.payload[key]));
      state.isLoggedIn = true;
    },
    logUserOut() {
      return initialState;
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
