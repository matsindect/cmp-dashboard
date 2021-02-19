import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrder = createAsyncThunk('cmpServiceProvider/order/getOrder', async params => {
	const response = await axios.get('/api/e-commerce-app/order', { params });
	const data = await response.data;

	return data;
});

export const saveOrder = createAsyncThunk('cmpServiceProvider/order/saveOrder', async order => {
	const response = await axios.post('/api/e-commerce-app/order/save', order);
	const data = await response.data;

	return data;
});

const orderSlice = createSlice({
	name: 'cmpServiceProvider/order',
	initialState: null,
	reducers: {},
	extraReducers: {
		[getOrder.fulfilled]: (state, action) => action.payload,
		[saveOrder.fulfilled]: (state, action) => action.payload
	}
});

export default orderSlice.reducer;
