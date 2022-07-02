import { configureStore } from "@reduxjs/toolkit";

import pokemonListReducer from "./pokemonListSlice";
import abilityListReducer from "./abilityListSlice";

export default configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
    abilityList: abilityListReducer,
  },
});
