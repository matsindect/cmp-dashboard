import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getBusinessTypes = createAsyncThunk('cmpBusinessType/businessType/getBusinessTypes', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/business-types/`);

	const data = await response.data;

	return data.data;
});

const BusinessTypesAdapter = createEntityAdapter({});

export const { selectAll: selectBusinessTypes, selectById: selectBusinessTypeById } = BusinessTypesAdapter.getSelectors(
	state => state.cmpBusinessType.businessTypes
);

const BusinessTypesSlice = createSlice({
	name: 'cmpBusinessType/businessTypes',
	initialState: BusinessTypesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setBusinessTypesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getBusinessTypes.fulfilled]: BusinessTypesAdapter.setAll
	}
});

export const { setBusinessTypesSearchText } = BusinessTypesSlice.actions;

export default BusinessTypesSlice.reducer;
