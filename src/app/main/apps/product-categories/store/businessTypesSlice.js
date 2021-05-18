import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getBusinessTypes = createAsyncThunk('cmpProductCategogies/businessTypes/getBusinessTypes', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/business-types/`);

	const data = await response.data;

	return data.data;
});

const businessTypesAdapter = createEntityAdapter({});

export const { selectAll: selectBusinessTypes, selectById: selectSectorById } = businessTypesAdapter.getSelectors(
	state => state.cmpProductCategogies.businessTypes
);

const businessTypesSlice = createSlice({
	name: 'cmpProductCategogies/businessTypes',
	initialState: businessTypesAdapter.getInitialState({
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
		[getBusinessTypes.fulfilled]: businessTypesAdapter.setAll
	}
});

export const { setBusinessTypesSearchText } = businessTypesSlice.actions;

export default businessTypesSlice.reducer;
