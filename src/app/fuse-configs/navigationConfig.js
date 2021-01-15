import { authRoles } from 'app/auth';
import i18next from 'i18next';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboards',
				title: 'Dashboards',
				translate: 'DASHBOARDS',
				type: 'collapse',
				icon: 'dashboard',
				children: [
					{
						id: 'analytics-dashboard',
						title: 'Analytics',
						type: 'item',
						url: '/apps/dashboards/analytics'
					}
				]
			},
			{
				id: 'products',
				title: 'Products',
				translate: 'Products',
				type: 'collapse',
				icon: 'shopping_cart',
				url: '/apps/e-commerce',
				children: [
					{
						id: 'e-commerce-products',
						title: 'All Products',
						type: 'item',
						url: '/apps/e-commerce/products',
						exact: true
					},
					{
						id: 'e-commerce-new-product',
						title: 'New Product',
						type: 'item',
						url: '/apps/e-commerce/products/new',
						exact: true
					},
					{
						id: 'e-commerce-product-categories',
						title: 'Product Categories',
						type: 'item',
						url: '/apps/e-commerce/orders',
						exact: true
					}
				]
			},
			{
				id: 'sectors',
				title: 'Sectors',
				translate: 'Sectors',
				type: 'collapse',
				icon: 'scatter_plot',
				url: '/apps/sectors',
				children: [
					{
						id: 'e-commerce-sectors',
						title: 'All Sectors',
						type: 'item',
						url: '/apps/sectors',
						exact: true
					},
					{
						id: 'e-commerce-new-sector',
						title: 'New Sector',
						type: 'item',
						url: '/apps/sectors/new',
						exact: true
					}
				]
			},
			{
				id: 'categories',
				title: 'Categories',
				translate: 'Categories',
				type: 'collapse',
				icon: 'pie_chart',
				url: '/apps/categories',
				children: [
					{
						id: 'e-commerce-categories',
						title: 'All Categories',
						type: 'item',
						url: '/apps/categories',
						exact: true
					},
					{
						id: 'e-commerce-new-catecory',
						title: 'New Catecory',
						type: 'item',
						url: '/apps/categories/new',
						exact: true
					},
					{
						id: 'e-commerce-catecory-detail',
						title: 'Catecory Detail',
						type: 'item',
						url: '/apps/categories/1/a-walk-amongst-friends-canvas-print',
						exact: true
					}
				]
			},
			{
				id: 'suppliers',
				title: 'Suppliers',
				translate: 'Suppliers',
				type: 'collapse',
				icon: 'supervised_user_circle',
				url: '/apps/e-commerce',
				children: [
					{
						id: 'e-commerce-suppliers',
						title: 'All Suppliers',
						type: 'item',
						url: '/apps/e-commerce/suppliers',
						exact: true
					},
					{
						id: 'e-commerce-new-supplier',
						title: 'New Supplier',
						type: 'item',
						url: '/apps/e-commerce/suppliers/new',
						exact: true
					},
					{
						id: 'e-commerce-supplier-detail',
						title: 'Supplier Detail',
						type: 'item',
						url: '/apps/e-commerce/suppliers/1/a-walk-amongst-friends-canvas-print',
						exact: true
					},
					{
						id: 'e-commerce-supplier-categories',
						title: 'Supplier Categories',
						type: 'item',
						url: '/apps/e-commerce/orders',
						exact: true
					}
				]
			},
			{
				id: 'contractors',
				title: 'Contractors',
				translate: 'Contractors',
				type: 'collapse',
				icon: 'supervisor_account',
				url: '/apps/e-commerce',
				children: [
					{
						id: 'e-commerce-contractors',
						title: 'All Contractors',
						type: 'item',
						url: '/apps/e-commerce/contractors',
						exact: true
					},
					{
						id: 'e-commerce-new-Contractor',
						title: 'New Contractor',
						type: 'item',
						url: '/apps/e-commerce/contractors/new',
						exact: true
					},
					{
						id: 'e-commerce-contractor-detail',
						title: 'Contractor Detail',
						type: 'item',
						url: '/apps/e-commerce/contractors/1/a-walk-amongst-friends-canvas-print',
						exact: true
					}
				]
			}
		]
	}
];

export default navigationConfig;
