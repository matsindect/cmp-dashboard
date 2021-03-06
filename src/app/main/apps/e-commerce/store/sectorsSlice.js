import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from './../../../../fuse-configs/domainConfig';

export const getSectors = createAsyncThunk('eCommerceApp/sectors/getSectors', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/sectors/`).then(res=>{
		console.log(res)
	}).catch(e=>{
		console.log(e.response.data)
	});
	
});

const sectorsAdapter = createEntityAdapter({});

export const { selectAll: selectSectors, selectById: selecSectorById } = sectorsAdapter.getSelectors(
	state => state.eCommerceApp.sectors
);

const sectorsSlice = createSlice({
	name: 'eCommerceApp/sectors',
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
