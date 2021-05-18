import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';
import FuseUtils from '@fuse/utils';
const token =  window.localStorage.getItem('jwt_access_token');

const config = {
		headers: { Authorization: `Bearer ${token}` }
};

export const getSector = createAsyncThunk('cmp/sector/getSector', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/sectors/${params.sectorId}`);
	const data = await response.data;
	console.log(data);
	return data.data;
});

export const saveSector = createAsyncThunk('cmp/sector/saveSector', async sector => {
	const response = await axios.post(`${domainConfig.api_url}api/v1/sectors`, sector, config);
	const data = await response.data;
	console.log(data);
	return data.data;
});

export const deleteSector = createAsyncThunk('cmp/sector/deleteSector', async id => {
	const response = await axios.delete(`${domainConfig.api_url}api/v1/sectors/${id}`, config);
	const data = await response;
	console.log(data);
	return data.data;
});

const sectorSlice = createSlice({
	name: 'cmp/sector',
	initialState: null,
	reducers: {
		newSector: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					description: '',
					categories: [],
					order: 0,
					images: [],
					parent:[],
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getSector.fulfilled]: (state, action) => action.payload,
		[saveSector.fulfilled]: (state, action) => action.payload,
		[deleteSector.fulfilled]: (state, action) => action.payload,
	}
});

export const { newSector } = sectorSlice.actions;

export default sectorSlice.reducer;
