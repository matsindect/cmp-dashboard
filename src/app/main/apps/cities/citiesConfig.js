import React from 'react';
import { Redirect } from 'react-router-dom';

const CitiesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/cities/:cityId/:cityslug?',
			component: React.lazy(() => import('./city/City'))
		},
		{
			path: '/apps/cities',
			component: React.lazy(() => import('./cities/Cities'))
		},
		{
			path: '/apps/cities',
			component: () => <Redirect to="/apps/cities" />
		}
	]
};

export default CitiesConfig;
