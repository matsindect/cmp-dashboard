import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';
import FuseUtils from '@fuse/utils';

export const getCity = createAsyncThunk('cmpCitiesMain/city/getCity', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/settings/city/${params.cityId}`);
	const data = await response.data;
	console.log(data);
	return data.data;
});

export const saveCity = createAsyncThunk('cmpCitiesMain/city/saveCity', async city => {
	const response = await axios.post(`${domainConfig.api_url}api/v1/settings/city`, city);
	const data = await response.data;
	console.log(data);
	return data.data;
});

const citySlice = createSlice({
	name: 'cmpCitiesMain/city',
	initialState: null,
	reducers: {
		newCity: {
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
		[getCity.fulfilled]: (state, action) => action.payload,
		[saveCity.fulfilled]: (state, action) => action.payload
	}
});

export const { newCity } = citySlice.actions;

export default citySlice.reducer;
