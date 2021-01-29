import React from 'react';
import { Redirect } from 'react-router-dom';

const productCategoriesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/product-categories/:sectorId/:sectorlug?',
			component: React.lazy(() => import('./product-category/Sector'))
		},
		{
			path: '/apps/product-categories',
			component: React.lazy(() => import('./product-categories/Sectors'))
		},
		{
			path: '/apps/product-categories',
			component: () => <Redirect to="/apps/product-categories" />
		}
	]
};

export default productCategoriesConfig;
