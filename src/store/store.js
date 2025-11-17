import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducer/counter-reduer";
import userReducer from "./reducer/user-reducer";
import { loadState, saveState } from "../storage/storage";

export const store = configureStore({
  reducer: {
    counter,
    userReducer,
  },
  preloadedState:{
    userReducer: loadState("users")
  }
}); 

store.subscribe(() =>{
  saveState("users", store.getState().userReducer)
})
