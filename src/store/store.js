import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import productReducer, {
  addProduct,
  incrementPrice,
  decrementPrice,
  deleteProduct,
  summation,
} from "./reducer/product-reducer";
import { loadState, saveState } from "../config/storage";

const listenerMiddleware = createListenerMiddleware();

// summation trigger
listenerMiddleware.startListening({
  matcher: isAnyOf(addProduct, incrementPrice, decrementPrice, deleteProduct),
  effect: (_, api) => {
    api.dispatch(summation());
  },
});

// 🟢 LOCALSTORAGE'DAN OQILONA YUKLASH (MUHIM FIX)
const persisted = loadState("products") || {};

export const store = configureStore({
  reducer: {
    product: productReducer,
  },

  preloadedState: {
    product: {
      count: persisted.count ?? 0,
      totalPrice: persisted.totalPrice ?? 0,
      productList: persisted.productList ?? [],
      likeList: persisted.likeList ?? [],   // ❤️ XATONI YO‘Q QILGAN JOY!
    },
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

// save to localStorage
store.subscribe(() => {
  saveState("products", store.getState().product);
});
