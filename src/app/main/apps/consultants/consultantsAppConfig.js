import React from 'react';
import { Redirect } from 'react-router-dom';

const consultantsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/consultants/:productId/:productHandle?',
			component: React.lazy(() => import('./consultant/Consultant'))
		},
		{
			path: '/apps/consultants',
			component: React.lazy(() => import('./consultants/Consultants'))
		},
		{
			path: '/apps/consultants',
			component: () => <Redirect to="/apps/consultants" />
		}
	]
};

export default consultantsAppConfig;
