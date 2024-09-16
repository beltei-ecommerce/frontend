import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "Loading",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
