import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getProductAttributes = createAsyncThunk('eCommerceApp/productsAttibutes/getProductAttributes', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/product-attributes/`);
	const data = await response.data.data;

	return data;
});

const productsAttributesAdapter = createEntityAdapter({});

export const { selectAll: selectProductAttributes, selectById: selectProductById } = productsAttributesAdapter.getSelectors(
	state => state.eCommerceApp.productAttributes
);

const productAttributesSlice = createSlice({
	name: 'eCommerceApp/productAttributes',
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
