import { configureStore } from "@reduxjs/toolkit";

import pokemonListReducer from "./pokemonListSlice";

export default configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
  },
});
