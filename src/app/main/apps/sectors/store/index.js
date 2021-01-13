import { combineReducers } from '@reduxjs/toolkit';
import sector from './sectorSlice';
import sectors from './sectorsSlice';

const reducer = combineReducers({
	sectors,
	sector
});

export default reducer;
