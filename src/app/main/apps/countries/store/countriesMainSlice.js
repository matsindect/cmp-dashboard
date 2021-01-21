import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getCountriesMain = createAsyncThunk('cmpCountriesMain/countriesMain/getCountriesMain', async () => {
	console.log('execute');
	const response = await axios.get(`${domainConfig.api_url}api/v1/settings/country/`);

	const data = await response.data;

	return data.data;
});

const countriesMainAdapter = createEntityAdapter({});

export const { selectAll: selectCountriesMain, selectById: selectCountryMainById } = countriesMainAdapter.getSelectors(
	state => state.cmpCountriesMain.countriesMain
);

const countriesMainSlice = createSlice({
	name: 'cmpCountriesMain/countriesMain',
	initialState: countriesMainAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCountriesMainSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCountriesMain.fulfilled]: countriesMainAdapter.setAll
	}
});

export const { setCountriesMainSearchText } = countriesMainSlice.actions;

export default countriesMainSlice.reducer;
