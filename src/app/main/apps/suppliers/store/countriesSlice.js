import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getCountries = createAsyncThunk('cmpSupplier/countries/getCountries', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/settings/country/`);
	const data = await response.data.data;

	return data;
});

const countriesAdapter = createEntityAdapter({});

export const { selectAll: selectCountries, selectById: selecCountryById } = countriesAdapter.getSelectors(
	state => state.cmpSupplier.countries
);

const countriesSlice = createSlice({
	name: 'cmpSupplier/countries',
	initialState: countriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCountriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCountries.fulfilled]: countriesAdapter.setAll
	}
});

export const { setCountriesSearchText } = countriesSlice.actions;

export default countriesSlice.reducer;
