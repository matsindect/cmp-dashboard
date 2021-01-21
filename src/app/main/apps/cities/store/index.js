import { combineReducers } from '@reduxjs/toolkit';
import cityMain from './cityMainSlice';
import citiesMain from './citiesMainSlice';

const reducer = combineReducers({
	citiesMain,
	cityMain
});

export default reducer;
