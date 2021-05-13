import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { newProduct, getProduct } from '../store/productSlice';
import { getOrders } from './../store/ordersSlice';
import {getCities} from '../store/citiesSlice'
import {getCountries} from '../store/countriesSlice'
import { getSectors } from './../store/sectorsSlice';
import { getProductAttributes} from './../store/productAttributesSlice'
import reducer from '../store';
import FormHeader from './formHeader';
import ProductInfoForm from './productInfoForm';
import MediaForm from './mediaForm';
import PricingForm from './pricingForm';
import ProductAttributesForm from './productAttribute';
import ReviewsForm from './reviewsForm';

function Product(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
	const [tabValue, setTabValue] = useState(0);

	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();


	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productId } = routeParams;

			if (productId === 'new') {
				dispatch(newProduct());
				dispatch(getOrders());
				dispatch(getSectors());
				dispatch(getProductAttributes())
				dispatch(getCities())
				dispatch(getCountries())
			} else {
				dispatch(getProduct(routeParams));
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((product && !form) || (product && form && product.id !== form.id)) {
			setForm(product);
		}
	}, [form, product, setForm]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}



	if ((!product || (product && routeParams.productId !== product.id)) && routeParams.productId !== 'new') {
		return <FuseLoading />;
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && <FormHeader	form={form}/>
			}
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
					<Tab className="h-64 normal-case" label="Product Info" />
					<Tab className="h-64 normal-case" label="Product Images" />
					<Tab className="h-64 normal-case" label="Product Pricing" />
					<Tab className="h-64 normal-case" label="Product attributes" />
					<Tab className="h-64 normal-case" label="Product reviews" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 && <ProductInfoForm form={form} setForm={setForm} handleChange={handleChange} />}
						{tabValue === 1 && <MediaForm form={form} setForm={setForm}/>} 
						{tabValue === 2 && <PricingForm form={form} setForm={setForm} handleChange={handleChange} />}
						{tabValue === 3 && <ProductAttributesForm form={form} setForm={setForm} />}
						{tabValue === 4 && <ReviewsForm form={form} handleChange={handleChange} />}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Product);
