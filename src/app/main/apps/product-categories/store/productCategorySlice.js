import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';
import FuseUtils from '@fuse/utils';

export const getSector = createAsyncThunk('cmpProductCategogies/sector/getSector', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/product-categories/${params.sectorId}`);
	const data = await response.data;
	console.log(data);
	return data.data;
});

export const saveSector = createAsyncThunk('cmpProductCategogies/sector/saveSector', async sector => {
	console.log(sector);
	const response = await axios.post(`${domainConfig.api_url}api/v1/product-categories`, sector);
	const data = await response.data;
	console.log(data);
	return data.data;
});

const sectorSlice = createSlice({
	name: 'cmpProductCategogies/sector',
	initialState: null,
	reducers: {
		newSector: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					description: '',
					sectors: [],
					categories: [],
					parent: [],
					business_types: [],
					order: 0,
					images: [],
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getSector.fulfilled]: (state, action) => action.payload,
		[saveSector.fulfilled]: (state, action) => action.payload
	}
});

export const { newSector } = sectorSlice.actions;

export default sectorSlice.reducer;
