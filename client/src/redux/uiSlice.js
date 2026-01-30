import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light", // light | dark
  primaryColor: localStorage.getItem("primaryColor") || "blue",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    setPrimaryColor(state, action) {
      state.primaryColor = action.payload;
      localStorage.setItem("primaryColor", action.payload);
    },
  },
});

export const { setTheme, setPrimaryColor } = uiSlice.actions;
export default uiSlice.reducer;
