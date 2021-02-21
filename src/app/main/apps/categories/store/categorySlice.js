import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';
import FuseUtils from '@fuse/utils';

export const getCategory = createAsyncThunk('cmpCategories/category/getCategory', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/categories/${params.categoryId}`);
	const data = await response.data;

	return data.data;
});

export const saveCategory = createAsyncThunk('cmpCategories/category/saveCategory', async category => {
	const response = await axios.post(`${domainConfig.api_url}api/v1/categories`, category);
	const data = await response.data;

	return data.data;
});

const categorySlice = createSlice({
	name: 'cmpCategories/category',
	initialState: null,
	reducers: {
		newCategory: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					description: '',
					order: 0,
					images: [],
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getCategory.fulfilled]: (state, action) => action.payload,
		[saveCategory.fulfilled]: (state, action) => action.payload
	}
});

export const { newCategory } = categorySlice.actions;

export default categorySlice.reducer;
