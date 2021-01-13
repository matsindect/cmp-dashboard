import React from 'react';
import { Redirect } from 'react-router-dom';

const SectorsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/sectors/sectors/:sectorId/:sectorHandle?',
			component: React.lazy(() => import('./sector/Sector'))
		},
		{
			path: '/apps/sectors/sectors',
			component: React.lazy(() => import('./sectors/Sectors'))
		},
		{
			path: '/apps/sectors',
			component: () => <Redirect to="/apps/sectors/sectors" />
		}
	]
};

export default SectorsConfig;
