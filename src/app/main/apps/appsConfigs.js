import AcademyAppConfig from './academy/AcademyAppConfig';
import CalendarAppConfig from './calendar/CalendarAppConfig';
import ChatAppConfig from './chat/ChatAppConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import AnalyticsDashboardAppConfig from './dashboards/analytics/AnalyticsDashboardAppConfig';
import ProjectDashboardAppConfig from './dashboards/project/ProjectDashboardAppConfig';
import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import MailAppConfig from './mail/MailAppConfig';
import NotesAppConfig from './notes/NotesAppConfig';
import ScrumboardAppConfig from './scrumboard/ScrumboardAppConfig';
import TodoAppConfig from './todo/TodoAppConfig';
import Sectors from './sectors/sectorsConfig';
import Categories from './categories/categoriesConfig';
import Cities from './cities/citiesConfig';
import Countries from './countries/countryConfig';
import Consultants from './consultants/consultantsAppConfig';
import Contractor from './contractor/contractorAppConfig';
import Supplier from './suppliers/supplierAppConfig';
import ProductCategories from './product-categories/productCategoriesConfig';
import ProductAttribute from './product-attributes/productAttributeConfig'
import BusinessTypes from './business-types/businessTypesConfig'
import ServiceProvider from './service-provider/serviceProviderAppConfig'
import Services from './services/servicesConfig'

const appsConfigs = [
	AnalyticsDashboardAppConfig,
	ProjectDashboardAppConfig,
	MailAppConfig,
	TodoAppConfig,
	FileManagerAppConfig,
	ContactsAppConfig,
	CalendarAppConfig,
	ChatAppConfig,
	ECommerceAppConfig,
	ScrumboardAppConfig,
	AcademyAppConfig,
	NotesAppConfig,
	Sectors,
	Categories,
	Cities,
	Countries,
	Consultants,
	Contractor,
	Supplier,
	ProductCategories,
	ProductAttribute,
	BusinessTypes,
	ServiceProvider,
	Services
];

export default appsConfigs;
