import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';
import FuseUtils from '@fuse/utils';

export const getBusinessType = createAsyncThunk('cmpBusinessType/business-types/getBusinessType', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/business-types/${params.businesstypeId}`);
	const data = await response.data;
	console.log(data);
	return data.data;
});

export const saveBusinessType = createAsyncThunk('cmpBusinessType/business-types/saveBusinessType', async sector => {
	const response = await axios.post(`${domainConfig.api_url}api/v1/business-types`, sector);
	const data = await response.data;
	
	return data.data;
});

const businessTypeSlice = createSlice({
	name: 'cmpBusinessType/businessType',
	initialState: null,
	reducers: {
		newBusinessType: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					description: '',
					order: 0,
					sectors:[],
					parent:[],
					images: [],
					is_active: true,
				}
			})
		}
	},
	extraReducers: {
		[getBusinessType.fulfilled]: (state, action) => action.payload,
		[saveBusinessType.fulfilled]: (state, action) => action.payload
	}
});

export const { newBusinessType } = businessTypeSlice.actions;

export default businessTypeSlice.reducer;
