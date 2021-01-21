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
						type: 'collapse',
						children: [
							{
								id: 'e-commerce-product-categories-all',
								title: 'All categories',
								type: 'item',
								url: '#'
							},
							{
								id: 'e-commerce-product-categories-new',
								title: 'New Category',
								type: 'item',
								url: 'http://fusetheme.com'
							}
						]
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
						id: 'cmp-sectors',
						title: 'All Sectors',
						type: 'item',
						url: '/apps/sectors',
						exact: true
					},
					{
						id: 'cmp-new-sector',
						title: 'New Sector',
						type: 'item',
						url: '/apps/sectors/new',
						exact: true
					}
				]
			},
			{
				id: 'services',
				title: 'Services',
				translate: 'Services',
				type: 'collapse',
				icon: 'room_service',
				url: '/apps/services',
				children: [
					{
						id: 'cmp-services',
						title: 'All Services',
						type: 'item',
						url: '/apps/services',
						exact: true
					},
					{
						id: 'cmp-new-service',
						title: 'New Service',
						type: 'item',
						url: '/apps/services/new',
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
						id: 'cmp-categories',
						title: 'All Categories',
						type: 'item',
						url: '/apps/categories',
						exact: true
					},
					{
						id: 'cmp-new-category',
						title: 'New Catecory',
						type: 'item',
						url: '/apps/categories/new',
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
				url: '/apps/suppliers',
				children: [
					{
						id: 'cmp-suppliers',
						title: 'All Suppliers',
						type: 'item',
						url: '/apps/suppliers',
						exact: true
					},
					{
						id: 'cmp-new-supplier',
						title: 'New Supplier',
						type: 'item',
						url: '/apps/suppliers/new',
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
				url: '/apps/contractors',
				children: [
					{
						id: 'cmp-contractors',
						title: 'All Contractors',
						type: 'item',
						url: '/apps/contractors',
						exact: true
					},
					{
						id: 'cmp-new-Contractor',
						title: 'New Contractor',
						type: 'item',
						url: '/apps/contractors/new',
						exact: true
					}
				]
			},
			{
				id: 'consultants',
				title: 'Consultants',
				translate: 'Consultants',
				type: 'collapse',
				icon: 'supervisor_account',
				url: '/apps/consultants',
				children: [
					{
						id: 'cmp-consultants',
						title: 'All Consultants',
						type: 'item',
						url: '/apps/consultants',
						exact: true
					},
					{
						id: 'cmp-consultants-new',
						title: 'New Consultant',
						type: 'item',
						url: '/apps/consultants/new',
						exact: true
					}
				]
			}
		]
	},
	{
		type: 'divider',
		id: 'divider-2'
	},
	{
		id: 'Settings',
		title: 'Settings',
		type: 'group',
		icon: 'Settings',
		children: [
			{
				id: 'cities',
				title: 'Cities',
				type: 'collapse',
				icon: 'account_balance',
				url: '/apps/cities',
				children: [
					{
						id: 'cities-all',
						title: 'All cities',
						type: 'item',
						url: '/apps/cities',
						exact: true
					},
					{
						id: 'cities-new',
						title: 'New city',
						type: 'item',
						url: '/apps/cities/new',
						exact: true
					}
				]
			},
			{
				id: 'countries',
				title: 'Countries',
				type: 'collapse',
				icon: 'emoji_flags',
				url: '/apps/countries',
				children: [
					{
						id: 'countries-all',
						title: 'All countries',
						type: 'item',
						url: '/apps/countries',
						exact: true
					},
					{
						id: 'countires-new',
						title: 'New country',
						type: 'item',
						url: '/apps/countries/new',
						exact: true
					}
				]
			}
		]
	}
];

export default navigationConfig;
