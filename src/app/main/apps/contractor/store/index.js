import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import sectors from './sectorsSlice';
import product from './ContractorSlice';
import products from './ContractorsSlice';
import cities from './citiesSlice';
import countries from './countriesSlice';

const reducer = combineReducers({
	products,
	product,
	orders,
	sectors,
	cities,
	countries,
	order
});

export default reducer;
