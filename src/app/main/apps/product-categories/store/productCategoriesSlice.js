import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getProductCategoriess = createAsyncThunk('cmpProductCategogies/sectors/getProductCategoriess', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/product-categories/`);

	const data = await response.data;

	return data.data;
});

const sectorsAdapter = createEntityAdapter({});

export const { selectAll: selectProductCategoriess, selectById: selectSectorById } = sectorsAdapter.getSelectors(
	state => state.cmpProductCategogies.sectors
);

const sectorsSlice = createSlice({
	name: 'cmpProductCategogies/sectors',
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
		[getProductCategoriess.fulfilled]: sectorsAdapter.setAll
	}
});

export const { setSectorsSearchText } = sectorsSlice.actions;

export default sectorsSlice.reducer;
