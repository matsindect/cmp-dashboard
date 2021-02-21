import React from 'react';
import { Redirect } from 'react-router-dom';

const CategoriesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/categories/:categoryId/:categorieslug?',
			component: React.lazy(() => import('./category/Category'))
		},
		{
			path: '/apps/categories',
			component: React.lazy(() => import('./categories/Categories'))
		},
		{
			path: '/apps/categories',
			component: () => <Redirect to="/apps/categories" />
		}
	]
};

export default CategoriesConfig;
