import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getProductCategoriess = createAsyncThunk('cmpProductCategogies/productCategories/getProductCategories', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/product-categories/`);

	const data = await response.data;

	return data.data;
});

const productCategoriesAdapter = createEntityAdapter({});

export const { selectAll: selectProductCategoriess, selectById: selectproductCategoriesById } = productCategoriesAdapter.getSelectors(
	state => state.cmpProductCategogies.productCategories
);

const productCategoriesSlice = createSlice({
	name: 'cmpProductCategogies/productCategories',
	initialState: productCategoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductCategoriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProductCategoriess.fulfilled]: productCategoriesAdapter.setAll
	}
});

export const { setProductCategoriesSearchText } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
