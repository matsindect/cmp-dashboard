import { combineReducers } from '@reduxjs/toolkit';
import productCategory from './productCategorySlice';
import productCategories from './productCategoriesSlice';
import sectors from './sectorsSlice';
import businessTypes from './businessTypesSlice';

const reducer = combineReducers({
	productCategories,
	productCategory,
	businessTypes,
	sectors
});

export default reducer;
