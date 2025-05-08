// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { bannerApi } from "./api/bannerApi"; // ✅ Import bannerApi
import { homeApi } from "./api/homeApi"; // ✅ Import homeApi
import { aboutApi } from "./api/aboutApi"; // ✅ Import aboutApi
import { productApi } from "./api/productApi"; // ✅ Import productApi
import { reviewApi } from "./api/reviewApi"; // ✅ Import reviewApi
import { storyApi } from "./api/storyApi"; // ✅ Import storyApi
import { cartApi } from "./api/cartApi"; // ✅ Import cartApi

export const store = configureStore({
  reducer: {
    [bannerApi.reducerPath]: bannerApi.reducer, // ✅ Add reducer
    [homeApi.reducerPath]: homeApi.reducer, // ✅ Add reducer
    [aboutApi.reducerPath]: aboutApi.reducer, // ✅ Add reducer
    [productApi.reducerPath]: productApi.reducer, // ✅ Add reducer
    [reviewApi.reducerPath]: reviewApi.reducer, // ✅ Add reducer
    [storyApi.reducerPath]: storyApi.reducer, // ✅ Add reducer
    [cartApi.reducerPath]: cartApi.reducer, // ✅ Add reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bannerApi.middleware)
      .concat(homeApi.middleware)
      .concat(aboutApi.middleware)
      .concat(productApi.middleware)
      .concat(reviewApi.middleware)
      .concat(storyApi.middleware)
      .concat(cartApi.middleware), // ✅ Add middleware
});
