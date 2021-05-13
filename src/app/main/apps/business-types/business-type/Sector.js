import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { getSectors } from '../store/sectorsSlice';
import { getBusinessTypes } from '../store/businessTypesSlice';
import { newBusinessType, getBusinessType } from '../store/businessTypeSlice';
import reducer from '../store';
import BusinessTypeForm from './businessTypeForm';
import FormHeader from './formHeader';


function Sector(props) {
	const dispatch = useDispatch();
	const sector = useSelector(({ cmpBusinessType }) => cmpBusinessType.businessType);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateBusinessTypeState() {
			const { businesstypeId } = routeParams;

			if (businesstypeId === 'new') {
				dispatch(newBusinessType());
				dispatch(getSectors());
				dispatch(getBusinessTypes());
			} else {
				dispatch(getBusinessType(routeParams));
			}
		}

		updateBusinessTypeState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((sector && !form) || (sector && form && sector.id !== form.id)) {
			setForm(sector);
		}
	}, [form, sector, setForm]);

	function handleChangeTab(value) {
		setTabValue(value);
	}


	if ((!sector || (sector && routeParams.businesstypeId !== sector._id)) && routeParams.businesstypeId !== 'new') {
		return <FuseLoading />;
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && <FormHeader form={form} sector={sector} />
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
					<Tab className="h-64 normal-case" label="Business type Info" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 && <BusinessTypeForm setForm={setForm} form={form} handleChange={handleChange} />}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('cmpBusinessType', reducer)(Sector);
