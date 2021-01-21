import React from 'react';
import { Redirect } from 'react-router-dom';

const contractorAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/contractors/:productId/:productHandle?',
			component: React.lazy(() => import('./product/contractor'))
		},
		{
			path: '/apps/contractors',
			component: React.lazy(() => import('./products/Contractors'))
		},
		{
			path: '/apps/contractors',
			component: () => <Redirect to="/apps/contractors" />
		}
	]
};

export default contractorAppConfig;
