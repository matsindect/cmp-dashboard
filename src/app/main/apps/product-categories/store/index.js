import { combineReducers } from '@reduxjs/toolkit';
import productCategory from './productCategorySlice';
import productCategories from './productCategoriesSlice';
import sectors from './sectorsSlice'

const reducer = combineReducers({
	productCategories,
	productCategory,
	sectors
});

export default reducer;
