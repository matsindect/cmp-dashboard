import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getCategories = createAsyncThunk('cmpCategories/categories/getCategories', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/categories/`);

	const data = await response.data;

	return data.data;
});

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoriesById } = categoriesAdapter.getSelectors(
	state => state.cmpCategories.categories
);

const categoriesSlice = createSlice({
	name: 'cmpCategories/categories',
	initialState: categoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCategoriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCategories.fulfilled]: categoriesAdapter.setAll
	}
});

export const { setCategoriesSearchText } = categoriesSlice.actions;

export default categoriesSlice.reducer;
