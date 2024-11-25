import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "INR",
  locale: "en-IN",
  exchangeRate: 1,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencyLocale: (state, action) => {
      state.currency = action.payload.currency;
      state.locale = action.payload.locale;
    },
    setExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    },
  },
});

export const { setCurrencyLocale, setExchangeRate } = currencySlice.actions;

export default currencySlice.reducer;
