import { createSlice } from "@reduxjs/toolkit";
export const loadSlice = createSlice({
  name: "load",
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: (state, action) => ({
      ...state,
      loading: true,
    }),
    finishLoading: (state, action) => ({
      ...state,
      loading: false,
    }),
  },
});
export const { startLoading, finishLoading } = loadSlice.actions;
export const selectLoading = (state) => state.loading.loading;
export default loadSlice.reducer;
