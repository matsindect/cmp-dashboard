import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';
import FuseUtils from '@fuse/utils';

export const getSector = createAsyncThunk('cmp/sector/getSector', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/sectors/${params.sectorId}`);
	const data = await response.data;
	console.log(data);
	return data.data;
});

export const saveSector = createAsyncThunk('cmp/sector/saveSector', async sector => {
	const response = await axios.post(`${domainConfig.api_url}api/v1/sectors`, sector);
	const data = await response.data;
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
