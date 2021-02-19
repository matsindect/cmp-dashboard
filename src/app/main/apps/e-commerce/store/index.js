import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import sectors from './sectorsSlice';
import product from './productSlice';
import products from './productsSlice';
import cities from './citiesSlice';
import countries from './countriesSlice';
import productAttributes from './productAttributesSlice'

const reducer = combineReducers({
	products,
	product,
	orders,
	sectors,
	cities,
	countries,
	order,
	productAttributes
});

export default reducer;
