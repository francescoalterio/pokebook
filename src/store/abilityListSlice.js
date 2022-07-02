import { createSlice } from "@reduxjs/toolkit";

export const abilityListSlice = createSlice({
  name: "abilityList",
  initialState: {
    value: [],
  },
  reducers: {
    setAbilityList: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setAbilityList } = abilityListSlice.actions;

export default abilityListSlice.reducer;
