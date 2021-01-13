import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getSector = createAsyncThunk('cmp/sector/getSector', async params => {
	const response = await axios.get('http://localhost:8086/api/v1/sectors', { params });
	const data = await response.data;
	console.log(data.data);
	return data.data;
});

export const saveSector = createAsyncThunk('cmp/sector/saveSector', async sector => {
	console.log(sector);
	const response = await axios.post('http://localhost:8086/api/v1/sectors', sector);
	const data = await response.data;

	return data;
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
