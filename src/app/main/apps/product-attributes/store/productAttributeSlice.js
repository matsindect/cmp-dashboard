import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../fuse-configs/domainConfig';
import FuseUtils from '@fuse/utils';

export const getProductAttributes = createAsyncThunk('cmpProductAttributes/productAttributes/getProductAttributes', async params => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/product-attributes/${params.sectorId}`);
	const data = await response.data;
	console.log(data);
	return data.data;
});

export const saveProductAttributes = createAsyncThunk('cmpProductAttributes/productAttributes/saveProductAttributes', async sector => {
	const response = await axios.post(`${domainConfig.api_url}api/v1/product-attributes`, sector);
	const data = await response.data;
	console.log(data);
	return data.data;
});

const productAttributeSlice = createSlice({
	name: 'cmpProductAttributes/productAttributes',
	initialState: null,
	reducers: {
		newProductAttributes: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					description: '',
					sectors: [],
					categories: [],
					parent: [],
					order: 0,
					images: [],
					is_active: true
				}
			})
		}
	},
	extraReducers: {
		[getProductAttributes.fulfilled]: (state, action) => action.payload,
		[saveProductAttributes.fulfilled]: (state, action) => action.payload
	}
});

export const { newProductAttributes } = productAttributeSlice.actions;

export default productAttributeSlice.reducer;
