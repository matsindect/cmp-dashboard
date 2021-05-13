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
import { newSector, getSector } from '../store/sectorSlice';
import {getSectors} from '../store/sectorsSlice';
import {getCategories} from '../store/categoriesSlice';
import reducer from '../store';

import FormHeader from './formHeader';
import SectorForm from './sectorForm';

function Sector(props) {
	const dispatch = useDispatch();
	const sector = useSelector(({ cmp }) => cmp.sector);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateSectorState() {
			const { sectorId } = routeParams;
			if (sectorId === 'new') {
				dispatch(newSector());
				dispatch(getSectors());
				dispatch(getCategories())
			} else {
				dispatch(getSector(routeParams));
			}
		}

		updateSectorState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((sector && !form) || (sector && form && sector.id !== form.id)) {
			setForm(sector);
		}
	}, [form, sector, setForm]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	

	if ((!sector || (sector && routeParams.sectorId !== sector._id)) && routeParams.sectorId !== 'new') {
		return <FuseLoading />;
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={form && <FormHeader form={form} sector={sector} />}
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
					<Tab className="h-64 normal-case" label="Sector Info" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 && <SectorForm form={form} handleChange={handleChange} setForm={setForm}  />}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('cmp', reducer)(Sector);
