import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getCitiesMain = createAsyncThunk('cmpCitiesMain/citiesMain/getCitiesMain', async () => {
	console.log('execute');
	const response = await axios.get(`${domainConfig.api_url}api/v1/settings/city/`);

	const data = await response.data;

	return data.data;
});

const citiesMainAdapter = createEntityAdapter({});

export const { selectAll: selectCitiesMain, selectById: selectCityMainById } = citiesMainAdapter.getSelectors(
	state => state.cmpCitiesMain.citiesMain
);

const citiesMainSlice = createSlice({
	name: 'cmpCitiesMain/citiesMain',
	initialState: citiesMainAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCitiesMainSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCitiesMain.fulfilled]: citiesMainAdapter.setAll
	}
});

export const { setCitiesMainSearchText } = citiesMainSlice.actions;

export default citiesMainSlice.reducer;
