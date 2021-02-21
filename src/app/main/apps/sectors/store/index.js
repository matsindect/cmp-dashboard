import { combineReducers } from '@reduxjs/toolkit';
import sector from './sectorSlice';
import sectors from './sectorsSlice';
import categories from './categoriesSlice'

const reducer = combineReducers({
	sectors,
	sector,
	categories
});

export default reducer;
