import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getSectors = createAsyncThunk('cmpProductAttributes/sectors/getSectors', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/sectors/`);

	const data = await response.data;

	return data.data;
});

const sectorsAdapter = createEntityAdapter({});

export const { selectAll: selectSectors, selectById: selectSectorById } = sectorsAdapter.getSelectors(
	state => state.cmpProductAttributes.sectors
);

const sectorsSlice = createSlice({
	name: 'cmpProductAttributes/sectors',
	initialState: sectorsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setSectorsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getSectors.fulfilled]: sectorsAdapter.setAll
	}
});

export const { setSectorsSearchText } = sectorsSlice.actions;

export default sectorsSlice.reducer;
