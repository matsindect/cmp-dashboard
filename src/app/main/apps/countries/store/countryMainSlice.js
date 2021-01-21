import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getCountry = createAsyncThunk('cmpCountriesMain/country/getCountry', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/settings/country/${params.countryId}`);
	const data = await response.data;
	console.log(data);
	return data.data;
});

export const saveCountry = createAsyncThunk('cmpCountriesMain/country/saveCountry', async country => {
	const response = await axios.post(`${domainConfig.api_url}api/v1/settings/country`, country);
	const data = await response.data;
	console.log(data);
	return data.data;
});

const countrySlice = createSlice({
	name: 'cmpCountriesMain/countryMain',
	initialState: null,
	reducers: {
		newCountry: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					description: '',
					order: 0,
					images: [],
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getCountry.fulfilled]: (state, action) => action.payload,
		[saveCountry.fulfilled]: (state, action) => action.payload
	}
});

export const { newCountry } = countrySlice.actions;

export default countrySlice.reducer;
