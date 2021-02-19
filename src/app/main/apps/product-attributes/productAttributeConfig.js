import React from 'react';
import { Redirect } from 'react-router-dom';

const productAttributesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/product-attributes/:sectorId/:sectorlug?',
			component: React.lazy(() => import('./product-attribute/Sector'))
		},
		{
			path: '/apps/product-attributes',
			component: React.lazy(() => import('./product-attributes/Sectors'))
		},
		{
			path: '/apps/product-attributes',
			component: () => <Redirect to="/apps/product-attributes" />
		}
	]
};

export default productAttributesConfig;
