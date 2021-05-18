import { combineReducers } from '@reduxjs/toolkit';
import productCategory from './productCategorySlice';
import productCategories from './productCategoriesSlice';
import sectors from './sectorsSlice'
import BusinessTypes from './businessTypesSlice';

const reducer = combineReducers({
	productCategories,
	productCategory,
	BusinessTypes,
	sectors
});

export default reducer;
