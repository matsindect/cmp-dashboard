import { combineReducers } from '@reduxjs/toolkit';
import service from './serviceSlice';
import services from './servicesSlice';
import sectors from './sectorsSlice'
import businessTypes from "./businessTypesSlice"

const reducer = combineReducers({
	services,
	service,
	sectors,
	businessTypes
});

export default reducer;

