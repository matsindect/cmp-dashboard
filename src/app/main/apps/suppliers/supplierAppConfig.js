import React from 'react';
import { Redirect } from 'react-router-dom';

const supplierAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/suppliers/:supplierId/:supplierHandle?',
			component: React.lazy(() => import('./supplier/Supplier'))
		},
		{
			path: '/apps/suppliers',
			component: React.lazy(() => import('./suppliers/Suppliers'))
		},
		{
			path: '/apps/suppliers',
			component: () => <Redirect to="/apps/suppliers" />
		}
	]
};

export default supplierAppConfig;
