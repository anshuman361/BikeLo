import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    city: "",
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});
export const { setCity } = locationSlice.actions;
export default locationSlice.reducer;
