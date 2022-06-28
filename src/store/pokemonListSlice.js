import { createSlice } from "@reduxjs/toolkit";

export const pokemonListSlice = createSlice({
  name: "pokemonList",
  initialState: {
    value: [],
  },
  reducers: {
    setPokemonList: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setPokemonList } = pokemonListSlice.actions;

export default pokemonListSlice.reducer;
