import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getSuppliers = createAsyncThunk('cmpSupplier/suppliers/getSuppliers', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/profiles/`);
	const data = await response.data.data;

	return data;
});

const suppliersAdapter = createEntityAdapter({});

export const { selectAll: selectSuppliers, selectById: selectSupplierById } = suppliersAdapter.getSelectors(
	state => state.cmpSupplier.suppliers
);

const suppliersSlice = createSlice({
	name: 'cmpSupplier/suppliers',
	initialState: suppliersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setSuppliersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getSuppliers.fulfilled]: suppliersAdapter.setAll
	}
});

export const { setSuppliersSearchText } = suppliersSlice.actions;

export default suppliersSlice.reducer;
