import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getCities = createAsyncThunk('cmpSupplier/cities/getCities', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/settings/city/`);
	const data = await response.data.data;

	return data;
});

const citiesAdapter = createEntityAdapter({});

export const { selectAll: selectCities, selectById: selecCityById } = citiesAdapter.getSelectors(
	state => state.cmpSupplier.cities
);

const citiesSlice = createSlice({
	name: 'cmpSupplier/cities',
	initialState: citiesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCitiesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCities.fulfilled]: citiesAdapter.setAll
	}
});

export const { setCitiesSearchText } = citiesSlice.actions;

export default citiesSlice.reducer;
