import React from 'react';
import { Redirect } from 'react-router-dom';

const ServiesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/services/:sectorId/:sectorslug?',
			component: React.lazy(() => import('./service/Sector'))
		},
		{
			path: '/apps/services',
			component: React.lazy(() => import('./services/Sectors'))
		},
		{
			path: '/apps/services',
			component: () => <Redirect to="/apps/services" />
		}
	]
};

export default ServiesConfig;
