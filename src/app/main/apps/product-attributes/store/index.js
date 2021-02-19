import { combineReducers } from '@reduxjs/toolkit';
import productAttribute from './productAttributeSlice';
import productAttributes from './productAttributesSlice';

const reducer = combineReducers({
	productAttributes,
	productAttribute
});

export default reducer;
