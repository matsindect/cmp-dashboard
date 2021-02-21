import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import sectors from './sectorsSlice';
import supplier from './supplierSlice';
import suppliers from './suppliersSlice';
import cities from './citiesSlice';
import countries from './countriesSlice';
import businessTypes from './businessTypesSlice'
import services from './servicesSlice'

const reducer = combineReducers({
	suppliers,
	supplier,
	orders,
	sectors,
	cities,
	countries,
	order,
	businessTypes,
	services
});

export default reducer;
