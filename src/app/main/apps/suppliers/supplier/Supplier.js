
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import CompanyForm from './companyForm';
import './pdf.css';
// import multer from 'multer';
// import sharp from 'sharp';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { newSupplier, getSupplier } from '../store/supplierSlice';
import { getOrders } from '../store/ordersSlice';
import { getSectors } from '../store/sectorsSlice';
import {getBusinessTypes} from '../store/businessTypesSlice';
import {getProducts} from '../store/productsSlice'
import reducer from '../store';
import MediaForm  from './mediaForm';
import FormHeader from './formHeader';
import ProductsForm from './productsForm';
import MapForm from './mapForm';
import ContactPersons from './contactPersonsForm';
import SocialForm from './SocialForm';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function Product(props) {
	const dispatch = useDispatch();
	const supplier = useSelector(({ cmpSupplier }) => cmpSupplier.supplier);
	const [tabValue, setTabValue] = useState(0);

	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	// onLoadSuccess={onDocumentLoadSuccess}


	useDeepCompareEffect(() => {
		function updateSupplierState() {
			const { supplierId } = routeParams;

			if (supplierId === 'new') {
				dispatch(newSupplier());
				dispatch(getOrders());
				dispatch(getSectors());
				dispatch(getBusinessTypes())
				dispatch(getProducts())
			} else {
				dispatch(getSupplier(routeParams));
			}
		}

		updateSupplierState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((supplier && !form) || (supplier && form && supplier.id !== form.id)) {
			setForm(supplier);
		}
	}, [form, supplier, setForm]);


	function handleChangeTab(event, value) {
		setTabValue(value);
	}


	if ((!supplier || (supplier && routeParams.supplierId !== supplier.id)) && routeParams.supplierId !== 'new') {
		return <FuseLoading />;
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={form && <FormHeader form={form} />}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Company Info" />
					<Tab className="h-64 normal-case" label="Images and Files" />
					<Tab className="h-64 normal-case" label="Products" />
					<Tab className="h-64 normal-case" label="Location" />
					<Tab className="h-64 normal-case" label="Contact persons" />
					<Tab className="h-64 normal-case" label="Social" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 &&  <CompanyForm form={form} handleChange={handleChange} />}
						{tabValue === 1 &&  <MediaForm form={form} setForm={setForm} />}
						{tabValue === 2 && <ProductsForm form={form} setForm={setForm}/>}
						{tabValue === 3 && <MapForm form={form} setForm={setForm}/>}
						{tabValue === 4 && <ContactPersons form={form}/>}
						{tabValue === 5 && <SocialForm form={form} handleChange={handleChange} />}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('cmpSupplier', reducer)(Product);