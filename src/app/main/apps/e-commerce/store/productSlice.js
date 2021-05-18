import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async params => {
	console.log(params);
	const response = await axios.get(`${domainConfig.api_url}api/v1/products/${params.productId}`);
	const data = await response.data.data;

	return data;
});

export const saveProduct = createAsyncThunk('eCommerceApp/product/saveProduct', async product => {
	console.log(product);
	const response = await axios.post(`${domainConfig.api_url}api/v1/products/`, product);
	const data = await response.data.data;
      
	return data;
});

const productSlice = createSlice({
	name: 'eCommerceApp/product',
	initialState: null,
	reducers: {
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					product_name: '',
					slug: '',
					description: '',
					categories: [],
					tags: [],
					images: [],
					product_location: {
						type: '',
						coordinates: [{ lat: 0, lng: 0 }]
					},
					product_attributes: [],
					product_categories: [],
					products_catalogue: [],
					sectors: [],
					origin: { city: [], country: [] },
					product_pricing: {
						currency: '',
						price: ''
					},
					featuredImageId: 0,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { newProduct } = productSlice.actions;

export default productSlice.reducer;
