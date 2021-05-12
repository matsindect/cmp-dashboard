import { authRoles } from 'app/auth';
import i18next from 'i18next';

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
				id: 'suppliers',
				title: 'Suppliers',
				translate: 'Suppliers Profiles',
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
						title: 'Categories',
						type: 'collapse',
						url: '/apps/product-categories',
						children: [
							{
								id: 'e-commerce-product-categories-all',
								title: 'All Categories',
								type: 'item',
								url: '/apps/product-categories',
								exact: true
							},
							{
								id: 'e-commerce-product-categories-new',
								title: 'New Category',
								type: 'item',
								url: '/apps/product-categories/new',
								exact: true
							}
						]
					},
					{
						id: 'e-commerce-product-attributes',
						title: 'Attributes',
						type: 'collapse',
						url: '/apps/product-attributes',
						children: [
							{
								id: 'e-commerce-product-attributes-all',
								title: 'All Attributes',
								type: 'item',
								url: '/apps/product-attributes',
								exact: true
							},
							{
								id: 'e-commerce-product-attributes-new',
								title: 'New Attributes',
								type: 'item',
								url: '/apps/product-attributes/new',
								exact: true
							}
						]
					}
				]
			},
			{
				id: 'service',
				title: 'Services',
				translate: 'Services',
				type: 'collapse',
				icon: 'scatter_plot',
				url: '/apps/services',
				children: [
					{
						id: 'cmp-service',
						title: 'All Services',
						type: 'item',
						url: '/apps/services',
						exact: true
					},
					{
						id: 'cmp-new-service-type',
						title: 'New Service',
						type: 'item',
						url: '/apps/services/new',
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
				id: 'business',
				title: 'Business Types',
				translate: 'Business Types',
				type: 'collapse',
				icon: 'pie_chart',
				url: '/apps/business-types',
				children: [
					{
						id: 'cmp-business',
						title: 'All Business Types',
						type: 'item',
						url: '/apps/business-types',
						exact: true
					},
					{
						id: 'cmp-new-business-type',
						title: 'New Business Type',
						type: 'item',
						url: '/apps/business-types/new',
						exact: true
					}
				]
			},

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
