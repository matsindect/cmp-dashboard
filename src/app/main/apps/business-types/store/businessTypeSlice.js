import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';


const token =  window.localStorage.getItem('jwt_access_token');

const config = {
		headers: { Authorization: `Bearer ${token}` }
};



export const getBusinessType = createAsyncThunk('cmpBusinessType/business-types/getBusinessType', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/business-types/${params.businesstypeId}`);
	const data = await response.data;
	return data.data;
});



export const saveBusinessType = createAsyncThunk('cmpBusinessType/business-types/saveBusinessType', async sector => {
	const response = await axios.post(`${domainConfig.api_url}api/v1/business-types`, sector, config);
	const data = await response.data;
  
	return data.data;
});


export const deleteBusinessType = createAsyncThunk('cmpBusinessType/businessType/deleteBusinessTypes', async (id) => {
	const response = await axios.delete(`${domainConfig.api_url}api/v1/business-types/${id}`);

	const data = await response;
	console.log(data);
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
					parent:[],
					images: [],
					is_active: true,
				}
			})
		}
	},
	extraReducers: {
		[getBusinessType.fulfilled]: (state, action) => action.payload,
		[saveBusinessType.fulfilled]: (state, action) => action.payload,
		[deleteBusinessType.fulfilled]: (state, action) => action.payload,
	}
});

export const { newBusinessType } = businessTypeSlice.actions;

export default businessTypeSlice.reducer;
