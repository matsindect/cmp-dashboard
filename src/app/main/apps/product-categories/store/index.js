import { combineReducers } from '@reduxjs/toolkit';
import sector from './productCategorySlice';
import sectors from './productCategoriesSlice';

const reducer = combineReducers({
	sectors,
	sector
});

export default reducer;
