import { combineReducers } from '@reduxjs/toolkit';
import businessType from './businessTypeSlice';
import businessTypes from './businessTypesSlice';
import sectors from './sectorsSlice'

const reducer = combineReducers({
	businessTypes,
	businessType,
	sectors
});

export default reducer;
