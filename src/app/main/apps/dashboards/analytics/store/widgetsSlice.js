import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import domainConfig from '../../../../../fuse-configs/domainConfig';

export const getWidgets = createAsyncThunk('analyticsDashboardApp/widgets/getWidgets', async () => {
	const response = await axios.get(`${domainConfig.api_url}api/v1/analytics`);
	const data = await response.data.data;
	return data;
});

const widgetsAdapter = createEntityAdapter({});

export const { selectEntities: selectWidgetsEntities, selectById: selectWidgetById } = widgetsAdapter.getSelectors(
	state => state.analyticsDashboardApp.widgets
);

const widgetsSlice = createSlice({
	name: 'analyticsDashboardApp/widgets',
	initialState: widgetsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getWidgets.fulfilled]: widgetsAdapter.setAll
	}
});

export default widgetsSlice.reducer;
