import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';
import FuseUtils from '@fuse/utils';

export const getServices = createAsyncThunk('cmpServices/service/getServices', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/services/${params.sectorId}`);
	const data = await response.data;
	console.log(data);
	return data.data;
});

export const saveServices = createAsyncThunk('cmpServices/service/saveServices', async sector => {
	const response = await axios.post(`${domainConfig.api_url}api/v1/services`, sector);
	const data = await response.data;
	console.log(data);
	return data.data;
});

const serviceSlice = createSlice({
	name: 'cmpServices/service',
	initialState: null,
	reducers: {
		newService: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					description: '',
					order: 0,
					sectors:[],
					parent:[],
					images: [],
					active: true,
				}
			})
		}
	},
	extraReducers: {
		[getServices.fulfilled]: (state, action) => action.payload,
		[saveServices.fulfilled]: (state, action) => action.payload
	}
});

export const { newService } = serviceSlice.actions;

export default serviceSlice.reducer;
