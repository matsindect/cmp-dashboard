import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from './../../../../fuse-configs/domainConfig';

export const getCategories = createAsyncThunk('cmp/categories/getCategories', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/categories/`);
	const data = await response.data.data;

	return data;
});

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoriesById } = categoriesAdapter.getSelectors(
	state => state.cmp.categories
);

const categoriesSlice = createSlice({
	name: 'cmp/categories',
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
