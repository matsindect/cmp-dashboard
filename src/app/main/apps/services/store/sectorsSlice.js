import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getSectors = createAsyncThunk('cmpServices/sectors/getSectors', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/sectors/`);
	const data = await response.data.data;

	return data;
});

const sectorsAdapter = createEntityAdapter({});

export const { selectAll: selectSectors, selectById: selecSectorById } = sectorsAdapter.getSelectors(
	state => state.cmpServices.sectors
);

const sectorsSlice = createSlice({
	name: 'cmpServices/sectors',
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
