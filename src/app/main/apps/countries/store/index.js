import { combineReducers } from '@reduxjs/toolkit';
import countryMain from './countryMainSlice';
import countriesMain from './countriesMainSlice';

const reducer = combineReducers({
	countriesMain,
	countryMain
});

export default reducer;
