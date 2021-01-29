import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import domainConfig from '../../../../fuse-configs/domainConfig';

export const getSupplier = createAsyncThunk('cmpSupplier/supplier/getSupplier', async params => {
	console.log(params);
	const response = await axios.get(`${domainConfig.api_url}api/v1/profiles/${params.supplierId}`);
	const data = await response.data.data;

	return data;
});

export const saveSupplier = createAsyncThunk('cmpSupplier/supplier/saveSupplier', async supplier => {
	console.log(supplier);
	const response = await axios.post(`${domainConfig.api_url}api/v1/profiles`, supplier);
	const data = await response.data.data;

	return data;
});

const supplierSlice = createSlice({
	name: 'cmpSupplier/supplier',
	initialState: null,
	reducers: {
		newSupplier: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					company: {
						name: '',
						location: {},
						about: '',
						tel: '',
						fax: '',
						website: '',
						email: '',
						businesstype: '',
						logo: '',
						license: ''
					},
					products_catalogue: [],
					images: [],
					contact_person: [],
					categories: [],
					sectors: [],
					services: [],
					sub_services: [],
					products: [],
					youtube: '',
					twitter: '',
					facebook: '',
					lnkedin: '',
					instagram: '',
					featuredImageId: 0,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getSupplier.fulfilled]: (state, action) => action.payload,
		[saveSupplier.fulfilled]: (state, action) => action.payload
	}
});

export const { newSupplier } = supplierSlice.actions;

export default supplierSlice.reducer;
