import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getServices = createAsyncThunk('cmpServices/services/getServices', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/services/`);

	const data = await response.data;

	return data.data;
});

const servicesAdapter = createEntityAdapter({});

export const { selectAll: selectServices, selectById: selectServicesById } = servicesAdapter.getSelectors(
	state => state.cmpServices.services
);

const servicesSlice = createSlice({
	name: 'cmpServices/services',
	initialState: servicesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setServicesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getServices.fulfilled]: servicesAdapter.setAll
	}
});

export const { setServicesSearchText } = servicesSlice.actions;

export default servicesSlice.reducer;
