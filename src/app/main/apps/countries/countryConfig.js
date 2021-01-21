import React from 'react';
import { Redirect } from 'react-router-dom';

const CountriesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/countries/:countryId/:countryslug?',
			component: React.lazy(() => import('./country/Country'))
		},
		{
			path: '/apps/countries',
			component: React.lazy(() => import('./countries/Countries'))
		},
		{
			path: '/apps/countries',
			component: () => <Redirect to="/apps/countries" />
		}
	]
};

export default CountriesConfig;
