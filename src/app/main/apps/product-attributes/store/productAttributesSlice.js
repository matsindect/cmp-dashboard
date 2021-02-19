import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getProductAttributes = createAsyncThunk('cmpProductAttributes/productAttributes/getProductAttributes', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/product-attributes/`);
	const data = await response.data.data;

	return data;
});

const productsAttributesAdapter = createEntityAdapter({});

export const { selectAll: selectProductAttributes, selectById: selectProductAttributesById } = productsAttributesAdapter.getSelectors(
	state => state.cmpProductAttributes.productAttributes
);

const productAttributesSlice = createSlice({
	name: 'cmpProductAttributes/productAttributes',
	initialState: productsAttributesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductAttributesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProductAttributes.fulfilled]: productsAttributesAdapter.setAll
	}
});

export const { setProductAttributesSearchText } = productAttributesSlice.actions;

export default productAttributesSlice.reducer;
