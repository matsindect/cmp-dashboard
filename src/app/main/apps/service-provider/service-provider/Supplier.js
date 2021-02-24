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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MuiPhoneNumber from 'material-ui-phone-number';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Map from './googlemaps';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './pdf.css';
// import multer from 'multer';
// import sharp from 'sharp';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveSupplier, newSupplier, getSupplier } from '../store/supplierSlice';
import { getOrders, selectOrders } from '../store/ordersSlice';
import { getSectors, selectSectors } from '../store/sectorsSlice';
import {getServices,selectServices } from '../store/servicesSlice'
import { getBusinessTypes, selectBusinessTypes } from '../store/businessTypesSlice';
import reducer from '../store';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
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

function Product(props) {
	const dispatch = useDispatch();
	const supplier = useSelector(({ cmpServiceProvider }) => cmpServiceProvider.supplier);
	const prodcategories = useSelector(selectOrders);
	const sectors = useSelector(selectSectors);
	const businessTypes = useSelector(selectBusinessTypes);
	const services = useSelector(selectServices)
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [data, setData] = useState(prodcategories);

	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	const [inputList, setInputList] = useState([{ name: '', email: '', cellphone: '', designation: '' }]);
	const [numFilename, setNumFilename] = useState(null);
	const [numCatalogue, setNumCatalogue] = useState(null);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	// onLoadSuccess={onDocumentLoadSuccess}

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
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
	const convertBlob = url => {
		let reader = new window.FileReader();
		fetch(url)
			.then(response => response.blob())
			.then(blob => {
				reader.readAsDataURL(blob);
				reader.onloadend = () => {
					var base64string = reader.result; //Passed to pdfjs
					console.log(base64string);
					return base64string;
				};
			});
	};
	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, { key: '', value: '' }]);
	};

	useDeepCompareEffect(() => {
		function updateSupplierState() {
			const { supplierId } = routeParams;

			if (supplierId === 'new') {
				dispatch(newSupplier());
				dispatch(getOrders());
				dispatch(getSectors());
				dispatch(getBusinessTypes())
				dispatch(getServices())
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

	function handleChipChange(value, name) {
		setForm(
			_.set(
				{ ...form },
				name,
				value.map(item => item)
			)
		);
	}

	function setFeaturedImage(id) {
		setForm(_.set({ ...form }, 'featuredImageId', id));
	}
	function handleLocationChange(input) {
		setForm(_.set({ ...form }, 'company.location', input));
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
						id: FuseUtils.generateGUID(),
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

	function handleUploadLicenseChange(e) {
		console.log(e.target.files);
		const file = e.target.files[0];
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `license`, `data:${file.type};base64,${btoa(reader.result)}`));
		};
		setNumFilename(file);
		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function handleUploadLogoChange(e) {
		console.log(e.target.files);
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `logo`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function handleCatalogueUploadChange(e) {
		console.log(e.target.files);
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(
				_.set({ ...form }, `products_catalogue`, [
					{
						id: FuseUtils.generateGUID(),
						url: `data:${file.type};base64,${btoa(reader.result)}`,
						type: 'image',
						file: file
					},
					...form.products_catalogue
				])
			);
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}
	function canBeSubmitted() {
		return form.company.name.length > 0 && !_.isEqual(supplier, form);
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
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/suppliers"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Service Provider</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									{form.images.length > 0 && form.featuredImageId ? (
										<img
											className="w-32 sm:w-48 rounded"
											src={_.find(form.images, { id: form.featuredImageId }).url}
											alt={form.company.name}
										/>
									) : (
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
											alt={form.company.name}
										/>
									)}
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.company.name ? form.company.name : 'New Service Provider'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Service provider Detail</Typography>
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
								onClick={() => dispatch(saveSupplier(form))}
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
					<Tab className="h-64 normal-case" label="Company Info" />
					<Tab className="h-64 normal-case" label="Images and Files" />
					<Tab className="h-64 normal-case" label="Services" />
					<Tab className="h-64 normal-case" label="Location" />
					<Tab className="h-64 normal-case" label="Contact persons" />
					<Tab className="h-64 normal-case" label="Social" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24 max-w-2xl">
						{tabValue === 0 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									error={form.company.name === ''}
									required
									label="Company Name"
									autoFocus
									id="name"
									name="name"
									value={form.company.name}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									id="about"
									name="about"
									onChange={handleChange}
									label="About the company"
									type="text"
									value={form.company.about}
									multiline
									rows={5}
									variant="outlined"
									fullWidth
								/>
								<MuiPhoneNumber
									defaultCountry={'ae'}
									variant="outlined"
									label="Phone number"
									id="tel"
									name="tel"
									value={form.company.tel}
									fullWidth
									className="mt-8 mb-16"
								/>
								<MuiPhoneNumber
									defaultCountry={'ae'}
									variant="outlined"
									label="Fax"
									id="fax"
									name="fax"
									value={form.company.fax}
									fullWidth
									className="mt-8 mb-16"
								/>

								<TextField
									className="mt-8 mb-16"
									required
									label="Company Email"
									autoFocus
									id="email"
									name="email"
									value={form.company.email}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16"
									label="Company website"
									autoFocus
									id="website"
									name="website"
									value={form.company.website}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>
						)}
						{tabValue === 1 && (
							<div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
									<p>Logo</p>
								</div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
									<label
										htmlFor="logo-file"
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
										)}
									>
										<input
											accept="image/*"
											className="hidden"
											id="logo-file"
											type="file"
											name="logo"
											onChange={handleUploadLogoChange}
										/>
										<Icon fontSize="large" color="action">
											cloud_upload
										</Icon>
									</label>
									{form.logo ? (
										<div
											role="button"
											tabIndex={0}
											className={clsx(
												classes.productImageItem,
												'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
											)}
										>
											<img
												className="max-w-none w-auto h-full"
												src={
													form.logo.startsWith('profile-logo/')
														? `http://localhost:8086/${form.logo}`
														: form.logo
												}
												alt="product"
											/>
										</div>
									) : null}
								</div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
									<p>License</p>
								</div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
									<label
										htmlFor="license-file"
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
										)}
									>
										<input
											accept="image/*"
											className="hidden"
											id="license-file"
											type="file"
											name="license"
											onChange={handleUploadLicenseChange}
										/>
										<Icon fontSize="large" color="action">
											cloud_upload
										</Icon>
									</label>
									{form.license ? (
										<div className="Example">
											<div className="container">
												{/* <div className="Example__container__load">
													<label htmlFor="file">Load from file:</label>{' '}
													<input onChange={onFileChange} type="file" />
												</div> */}
												<div className="document">
													<Document
														file={form.license != '' ? form.license : numFilename}
														onLoadSuccess={onDocumentLoadSuccess}
														options={{
															cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
															cMapPacked: true
														}}
													>
														{Array.from(new Array(numPages), (el, index) => (
															<Page key={`page_${index + 1}`} pageNumber={index + 1} />
														))}
													</Document>
												</div>
											</div>
										</div>
									) : null}
								</div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
									<p>Gallary images</p>
								</div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
									<label
										htmlFor="button-file"
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
										)}
									>
										<input
											accept="image/*"
											className="hidden"
											id="button-file"
											type="file"
											name="images"
											onChange={handleUploadChange}
										/>
										<Icon fontSize="large" color="action">
											cloud_upload
										</Icon>
									</label>
									{form.images.map(media => (
										<div
											onClick={() => setFeaturedImage(media.id)}
											onKeyDown={() => setFeaturedImage(media.id)}
											role="button"
											tabIndex={0}
											className={clsx(
												classes.productImageItem,
												'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5',
												media.id === form.featuredImageId && 'featured'
											)}
											key={media.id}
										>
											<Icon className={classes.productImageFeaturedStar}>star</Icon>
											<img
												className="max-w-none w-auto h-full"
												src={
													media.url.startsWith('gallary/')
														? `http://localhost:8086/${media.url}`
														: media.url
												}
												alt="product"
											/>
										</div>
									))}
								</div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
									<p>Products catalogue</p>
								</div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
									<label
										htmlFor="product-file"
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
										)}
									>
										<input
											accept="image/*"
											className="hidden"
											id="product-file"
											name="products_catalogue"
											type="file"
											onChange={handleCatalogueUploadChange}
										/>
										<Icon fontSize="large" color="action">
											cloud_upload
										</Icon>
									</label>
									{form.products_catalogue.map(media => (
										<div
											onClick={() => setFeaturedImage(media.id)}
											onKeyDown={() => setFeaturedImage(media.id)}
											role="button"
											tabIndex={0}
											className={clsx(
												classes.productImageItem,
												'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5',
												media.id === form.featuredImageId && 'featured'
											)}
											key={media.id}
										>
											<Document
												file={
													media.url.startsWith('profile-catalogues/')
														? `http://localhost:8086/${media.url}`
														: media.file
												}
												onLoadSuccess={onDocumentLoadSuccess}
												options={{
													cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
													cMapPacked: true
												}}
											></Document>
										</div>
									))}
								</div>
							</div>
						)}
						{tabValue === 2 && (
							<div>
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
									options={prodcategories.map(item => ({
										value: item._id,
										label: item.name
									}))}
									isMulti
								/>
								<FuseChipSelect
									className="mt-8 mb-24"
									value={form.company.businesstype.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'company.businesstype')}
									placeholder="Select business type"
									textFieldProps={{
										label: 'Business Type',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									options={businessTypes.map(item => ({
										value: item._id,
										label: item.name
									}))}
									isMulti
								/>
								<FuseChipSelect
									className="mt-8 mb-16"
									value={form.sectors.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'sectors')}
									placeholder="Select multiple sectors"
									textFieldProps={{
										label: 'Sectors',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									options={sectors.map(item => ({
										value: item._id,
										label: item.name
									}))}
									isMulti
								/>

								<FuseChipSelect
									className="mt-8 mb-16"
									value={form.services.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'services')}
									placeholder="Select services"
									textFieldProps={{
										label: 'Services',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									options={services.map(item => ({
										value: item._id,
										label: item.name
									}))}
									isMulti
								/>
								<FuseChipSelect
									className="mt-8 mb-16"
									value={form.sub_services.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'sub_services')}
									placeholder="Select sub services"
									textFieldProps={{
										label: 'Sub services',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
									}}
									options={services.map(item => ({
										value: item._id,
										label: item.name
									}))}
									isMulti
								/>
								
							</div>
						)}
						{tabValue === 3 && (
							<div>
								<Map
									// google={this.props.google}
									center={{
										lat: 23.4241,
										lng: 53.8478
									}}
									height="300px"
									zoom={15}
									// onChange={this.onChange}
									form={form}
									handleLocationChange={handleLocationChange}
								/>
							</div>
						)}
						{tabValue === 4 && (
							<div>
								{inputList.map((x, i) => {
									return (
										<div className="box">
											<FormControl variant="filled" className={classes.formControl}>
												<TextField
													className="mt-8 mb-16"
													required
													label="Name"
													autoFocus
													id="name"
													name="name"
													onChange={e => handleInputChange(e, i)}
													variant="outlined"
													fullWidth
												/>
											</FormControl>
											<FormControl variant="filled" className={classes.formControl}>
												<TextField
													className="mt-8 mb-16"
													required
													label="Email"
													autoFocus
													id="email"
													name="email"
													onChange={e => handleInputChange(e, i)}
													variant="outlined"
													fullWidth
												/>
											</FormControl>
											<FormControl variant="filled" className={classes.formControl}>
												<MuiPhoneNumber
													defaultCountry={'ae'}
													variant="outlined"
													label="Phone number"
													className="mt-8 mb-16"
													name="cellphone"
												/>
											</FormControl>
											<FormControl variant="filled" className={classes.formControl}>
												<TextField
													className="mt-8 mb-16"
													required
													label="Designation"
													autoFocus
													id="designation"
													name="designation"
													onChange={e => handleInputChange(e, i)}
													variant="outlined"
													fullWidth
												/>
											</FormControl>
											<FormControl variant="filled" className={classes.formControl}>
												<div className="btn-box">
													{inputList.length !== 1 && (
														<IconButton
															color="primary"
															onClick={() => handleRemoveClick(i)}
															aria-label="add to shopping cart"
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
							</div>
						)}
						{tabValue === 5 && (
							<div>
								<TextField
									className="mt-8 mb-16 mx-4"
									label="twitter"
									InputProps={{
										endAdornment: (
											<InputAdornment>
												<IconButton>
													<TwitterIcon />
												</IconButton>
											</InputAdornment>
										)
									}}
									id="twitter"
									name="twitter"
									value={form.twitter}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16 mx-4"
									label="facebook"
									InputProps={{
										endAdornment: (
											<InputAdornment>
												<IconButton>
													<FacebookIcon />
												</IconButton>
											</InputAdornment>
										)
									}}
									id="facebook"
									name="facebook"
									value={form.facebook}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16 mx-4"
									label="instagram"
									InputProps={{
										endAdornment: (
											<InputAdornment>
												<IconButton>
													<InstagramIcon />
												</IconButton>
											</InputAdornment>
										)
									}}
									id="instagram"
									name="instagram"
									value={form.instagram}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16 mx-4"
									label="linkedin"
									InputProps={{
										endAdornment: (
											<InputAdornment>
												<IconButton>
													<LinkedInIcon />
												</IconButton>
											</InputAdornment>
										)
									}}
									id="lnkedin"
									name="lnkedin"
									value={form.lnkedin}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
								<TextField
									className="mt-8 mb-16 mx-4"
									label="youtube"
									InputProps={{
										endAdornment: (
											<InputAdornment>
												<IconButton>
													<YouTubeIcon />
												</IconButton>
											</InputAdornment>
										)
									}}
									id="youtube"
									name="youtube"
									value={form.youtube}
									onChange={handleChange}
									variant="outlined"
									fullWidth
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

export default withReducer('cmpServiceProvider', reducer)(Product);
