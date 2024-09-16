import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading";

const store = configureStore({
  reducer: {
    Loading: loadingReducer,
  },
});

export default store;
