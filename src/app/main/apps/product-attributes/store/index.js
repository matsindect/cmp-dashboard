import { combineReducers } from '@reduxjs/toolkit';
import productAttribute from './productAttributeSlice';
import productAttributes from './productAttributesSlice';
import sectors from './sectorsSlice';
import categories from './categoriesSlice'

const reducer = combineReducers({
	productAttributes,
	productAttribute,
	sectors,
	categories
});

export default reducer;
