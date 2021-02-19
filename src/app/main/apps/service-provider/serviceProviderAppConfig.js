import React from 'react';
import { Redirect } from 'react-router-dom';

const serviceProviderAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/services-providers/:supplierId/:supplierHandle?',
			component: React.lazy(() => import('./service-provider/Supplier'))
		},
		{
			path: '/apps/services-providers',
			component: React.lazy(() => import('./service-providers/Suppliers'))
		},
		{
			path: '/apps/services-providers',
			component: () => <Redirect to="/apps/suppliers" />
		}
	]
};

export default serviceProviderAppConfig;
