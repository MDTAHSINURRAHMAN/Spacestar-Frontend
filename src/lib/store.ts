// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { bannerApi } from "./api/bannerApi"; // ✅ Import bannerApi
import { homeApi } from "./api/homeApi"; // ✅ Import homeApi
import { aboutApi } from "./api/aboutApi"; // ✅ Import aboutApi
import { productApi } from "./api/productApi"; // ✅ Import productApi
import { reviewApi } from "./api/reviewApi"; // ✅ Import reviewApi
import { storyApi } from "./api/storyApi"; // ✅ Import storyApi
import { privacyApi } from "./api/privacyApi"; // ✅ Import privacyApi
import { cartSlice } from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    [bannerApi.reducerPath]: bannerApi.reducer, // ✅ Add reducer
    [homeApi.reducerPath]: homeApi.reducer, // ✅ Add reducer
    [aboutApi.reducerPath]: aboutApi.reducer, // ✅ Add reducer
    [productApi.reducerPath]: productApi.reducer, // ✅ Add reducer
    [reviewApi.reducerPath]: reviewApi.reducer, // ✅ Add reducer
    [storyApi.reducerPath]: storyApi.reducer, // ✅ Add reducer
    [privacyApi.reducerPath]: privacyApi.reducer, // ✅ Add reducer
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bannerApi.middleware)
      .concat(homeApi.middleware)
      .concat(aboutApi.middleware)
      .concat(productApi.middleware)
      .concat(reviewApi.middleware)
      .concat(storyApi.middleware)
      .concat(privacyApi.middleware), // ✅ Add middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
