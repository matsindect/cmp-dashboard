import React from 'react';
import { Redirect } from 'react-router-dom';

const SectorsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/business-types/:businesstypeId/:sectorslug?',
			component: React.lazy(() => import('./business-type/Sector'))
		},
		{
			path: '/apps/business-types',
			component: React.lazy(() => import('./business-types/Sectors'))
		},
		{
			path: '/apps/business-types',
			component: () => <Redirect to="/apps/business-types" />
		}
	]
};

export default SectorsConfig;
