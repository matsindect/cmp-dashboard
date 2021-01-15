import React from 'react';
import { Redirect } from 'react-router-dom';

const SectorsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/sectors/:sectorId/:sectorslug?',
			component: React.lazy(() => import('./sector/Sector'))
		},
		{
			path: '/apps/sectors',
			component: React.lazy(() => import('./sectors/Sectors'))
		},
		{
			path: '/apps/sectors',
			component: () => <Redirect to="/apps/sectors" />
		}
	]
};

export default SectorsConfig;
