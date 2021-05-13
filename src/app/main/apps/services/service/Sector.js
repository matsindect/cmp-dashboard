import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {newService, getService } from '../store/serviceSlice';
import {getSectors} from "../store/sectorsSlice";
import {getBusinessTypes} from '../store/businessTypesSlice';
import {getServices} from '../store/servicesSlice'
import reducer from '../store';

import FormHeader from './formHeader';
import ServiceForm from './serviceForm';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function Sector(props) {
	const dispatch = useDispatch();
	const sector = useSelector(({ cmpServices }) => cmpServices.service);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateSectorState() {
			const { sectorId } = routeParams;

			if (sectorId === 'new') {
				dispatch(newService());
				dispatch(getSectors())
				dispatch(getBusinessTypes())
				dispatch(getServices())
			} else {
				dispatch(getService(routeParams));
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
					<Tab className="h-64 normal-case" label="Service Info" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 && <ServiceForm  form={form} handleChange={handleChange} setForm={setForm}/>}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('cmpServices', reducer)(Sector);
