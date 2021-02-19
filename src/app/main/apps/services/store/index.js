import { combineReducers } from '@reduxjs/toolkit';
import service from './serviceSlice';
import services from './servicesSlice';
import sectors from './sectorsSlice'

const reducer = combineReducers({
	services,
	service,
	sectors
});

export default reducer;

