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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveProductAttributes, newProductAttributes, getProductAttributes } from '../store/productAttributeSlice';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import reducer from '../store';

const useStyles = makeStyles(theme => ({
	formControl: {
		// margin: theme.spacing(1),
		minWidth: "90%",
	},
	center:{
		display: 'block',
		marginLeft:'auto',
		marginRight:'auto',
		justifyContent: 'center',
		marginTop:20
	},
	variantButton:{
		width:'10%',
		position:"relative",
		flexDirection: 'column',
		display: 'inline-flex'
	},
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
	const sector = useSelector(({ cmpProductAttributes }) => cmpProductAttributes.productAttribute);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	const [inputList, setInputList] = useState([{ key: '', value: '' }]);


	useDeepCompareEffect(() => {
		function updateSectorState() {
			const { sectorId } = routeParams;

			if (sectorId === 'new') {
				dispatch(newProductAttributes());
			} else {
				dispatch(getProductAttributes(routeParams));
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

	function handleChipChange(value, name) {
		setForm(
			_.set(
				{ ...form },
				name,
				value.map(item => item.label)
			)
		);
	}
console.log(form)
	function setFeaturedImage(id) {
		setForm(_.set({ ...form }, 'featuredImageId', id));
	}

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(
				_.set({ ...form }, `images`, [
					{
						url: `data:${file.type};base64,${btoa(reader.result)}`,
						type: 'image'
					},
					...form.images
				])
			);
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function canBeSubmitted() {
		return form.name.length > 0 && !_.isEqual(sector, form);
	}

	if ((!sector || (sector && routeParams.sectorId !== sector._id)) && routeParams.sectorId !== 'new') {
		return <FuseLoading />;
	}

		// handle input change
		const handleInputChange = (e, index) => {
			const { name, value } = e.target;
			const list = [...inputList];
			list[index][name] = value;
			setInputList(list);
			form.product_attributes = list;
		};
	
		// handle click event of the Remove button
		const handleRemoveClick = index => {
			const list = [...inputList];
			list.splice(index, 1);
			setInputList(list);
			form.product_attributes = list;
		};
	
		// handle click event of the Add button
		const handleAddClick = () => {
			setInputList([...inputList, { key: '', value: '' }]);
		};
	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/product-attributes"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Attributes</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									{form.images.length > 0 && form.featuredImageId ? (
										<img
											className="w-32 sm:w-48 rounded"
											src={_.find(form.images, { _id: form.featuredImageId }).url}
											alt={form.name}
										/>
									) : (
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
											alt={form.name}
										/>
									)}
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.name ? form.name : 'New Product Attribute'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Product Attribute Detail</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(saveProductAttributes(form))}
							>
								Save
							</Button>
						</FuseAnimate>
					</div>
				)
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
					<Tab className="h-64 normal-case" label="Product Attribute Info" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									error={form.name === ''}
									required
									label="Name"
									autoFocus
									id="name"
									name="name"
									value={form.name}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
	
								{inputList.map((x, i) => {
									return (
										<div className="box" key={i}>
											<FormControl variant="filled" className={classes.formControl}>
												<TextField
													className="mt-8 mb-16"
													required
													label="Variants"
													autoFocus
													id="variant"
													name="variant"
													onChange={e => handleInputChange(e, i)}
													variant="outlined"
													fullWidth
												/>
											</FormControl>
											
											<FormControl variant="filled" className={classes.variantButton}>
												<div className="btn-box " className={classes.center}>
													{inputList.length !== 1 && (
														<IconButton
															color="primary"
															onClick={() => handleRemoveClick(i)}
															aria-label="add variant"
														>
															<DeleteIcon />
														</IconButton>
													)}
													{inputList.length - 1 === i && (
														<AddCircleIcon onClick={handleAddClick} />
													)}
												</div>
											</FormControl>
											
										</div>
									);
								})}
						
								<TextField
									className="mt-8 mb-16"
									id="description"
									name="description"
									onChange={handleChange}
									label="Description"
									type="text"
									value={form.description}
									multiline
									rows={5}
									variant="outlined"
									fullWidth
								/>
								<FuseChipSelect
									className="mt-8 mb-24"
									value={form.categories.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'categories')}
									placeholder="Select multiple setors"
									textFieldProps={{
										label: 'Sectors',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									isMulti
								/>
								<FuseChipSelect
									className="mt-8 mb-24"
									value={form.categories.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'categories')}
									placeholder="Select multiple categories"
									textFieldProps={{
										label: 'Categories',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									isMulti
								/>
								
								
								
							</div>
						)}
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('cmpProductAttributes', reducer)(Sector);
