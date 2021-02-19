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
import KeyValue from './key.value';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveProduct, newProduct, getProduct } from '../store/productSlice';
import { getOrders, selectOrders } from './../store/ordersSlice';
import { getSectors, selectSectors } from './../store/sectorsSlice';
import { getProductAttributes, selectProductAttributes} from './../store/productAttributesSlice'
import reducer from '../store';

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
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
	const prodcategories = useSelector(selectOrders);
	const sectors = useSelector(selectSectors);
	const product_attributes = useSelector(selectProductAttributes)
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [variant, setVariant] = useState(null);
	const [data, setData] = useState(prodcategories);

	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();
	const [inputList, setInputList] = useState([{ key: '', value: '' }]);

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
		setInputList([...inputList, { key: '', value: '', unit:'' }]);
	};

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productId } = routeParams;

			if (productId === 'new') {
				dispatch(newProduct());
				dispatch(getOrders());
				dispatch(getSectors());
				dispatch(getProductAttributes())
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

	function handleChipChange(value, name) {
		setForm(
			_.set(
				{ ...form },
				name,
				value.map(item => item.label)
			)
		);
	}
	function getVariant(value) {

		const vari = product_attributes.varriants.filter(variant =>{
				return String(variant._id) === String(value)
		})
		setVariant(vari);
	}

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
	function handleCatalogueUploadChange(e) {
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
						type: 'image'
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
		return form.product_name.length > 0 && !_.isEqual(product, form);
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
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/apps/e-commerce/products"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Products</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									{form.images.length > 0 && form.featuredImageId ? (
										<img
											className="w-32 sm:w-48 rounded"
											src={_.find(form.images, { id: form.featuredImageId }).url}
											alt={form.product_name}
										/>
									) : (
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
											alt={form.product_name}
										/>
									)}
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.product_name ? form.product_name : 'New Product'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">Product Detail</Typography>
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
								onClick={() => dispatch(saveProduct(form))}
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
						{tabValue === 0 && (
							<div>
								<TextField
									className="mt-8 mb-16"
									error={form.product_name === ''}
									required
									label="Product Name"
									autoFocus
									id="product_name"
									name="product_name"
									value={form.product_name}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

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
									value={form.product_categories.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'product_categories')}
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
							</div>
						)}
						{tabValue === 1 && (
							<div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
									<p>Product images</p>
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
											<img className="max-w-none w-auto h-full" src={media.url} alt="product" />
										</div>
									))}
								</div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
									<p>Product catalogue</p>
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
											<Icon className={classes.productImageFeaturedStar}>star</Icon>
											<img className="max-w-none w-auto h-full" src={media.url} alt="product" />
										</div>
									))}
								</div>
							</div>
						)}
						{tabValue === 2 && (
							<div>
								<FormControl variant="filled" className={classes.formControl}>
									<FuseChipSelect
										className="mt-8 mb-16"
										value={form.sectors.map(item => ({
											value: item,
											label: item
										}))}
										onChange={value => handleChipChange(value, 'currency')}
										placeholder=""
										textFieldProps={{
											label: 'Currency',
											InputLabelProps: {
												shrink: true
											},
											variant: 'outlined'
										}}
										options={sectors.map(item => ({
											value: item._id,
											label: item.name
										}))}
									/>
								</FormControl>
								<FormControl variant="filled" className={classes.formControl}>
									<TextField
										className="mt-8 mb-16"
										label="Price"
										id="priceTaxExcl"
										name="priceTaxExcl"
										value={form.product_pricing.price}
										onChange={handleChange}
										// InputProps={{
										// 	startAdornment: <InputAdornment position="start">$</InputAdornment>
										// }}
										type="number"
										variant="outlined"
										autoFocus
										fullWidth
									/>
								</FormControl>
								<FuseChipSelect
									className="mt-8 mb-16"
									value={form.sectors.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'sectors')}
									placeholder="Select country of origin"
									textFieldProps={{
										label: 'Country origin',
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
									value={form.sectors.map(item => ({
										value: item,
										label: item
									}))}
									onChange={value => handleChipChange(value, 'sectors')}
									placeholder="Select city of origin"
									textFieldProps={{
										label: 'City origin',
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
							</div>
						)}
						{tabValue === 3 && (
							<div>
								{inputList.map((x, i) => {
									return (
										<div className="box">
											<FuseChipSelect
												className="mt-8 mb-16"
												value={form.product_attributes.map(item => ({
													value: item,
													label: item
												}))}
												onChange={value => {handleChipChange(value, 'product_attributes'); getVariant(value)}}
												placeholder="Select city of product attribute"
												textFieldProps={{
													label: 'Product Attributes',
													InputLabelProps: {
														shrink: true
													},
													variant: 'outlined'
												}}
												options={product_attributes.map(item => ({
													value: item._id,
													label: item.name
												}))}
												isMulti
											/>
											{variant && 
											
											<FuseChipSelect
												className="mt-8 mb-16"
												value={variant.map(item => ({
													value: item,
													label: item
												}))}
												onChange={value => {handleChipChange(value, 'variant')}}
												placeholder="Select  product variant"
												textFieldProps={{
													label: 'Product Attributes',
													InputLabelProps: {
														shrink: true
													},
													variant: 'outlined'
												}}
												options={variant.map(item => ({
														value: item._id,
														label: item.label
												}))}
												isMulti
											/>}
											<FormControl variant="filled" className={classes.formControl}>
												<TextField
													className="mt-8 mb-16"
													required
													label="Value"
													autoFocus
													id="value"
													name="value"
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
						{tabValue === 4 && (
							<div>
								<div className="flex -mx-4">
									<TextField
										className="mt-8 mb-16 mx-4"
										label="Width"
										autoFocus
										id="width"
										name="width"
										value={form.width}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>

									<TextField
										className="mt-8 mb-16 mx-4"
										label="Height"
										id="height"
										name="height"
										value={form.height}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>

									<TextField
										className="mt-8 mb-16 mx-4"
										label="Depth"
										id="depth"
										name="depth"
										value={form.depth}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
								</div>

								<TextField
									className="mt-8 mb-16"
									label="Weight"
									id="weight"
									name="weight"
									value={form.weight}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>

								<TextField
									className="mt-8 mb-16"
									label="Extra Shipping Fee"
									id="extraShippingFee"
									name="extraShippingFee"
									value={form.extraShippingFee}
									onChange={handleChange}
									variant="outlined"
									InputProps={{
										startAdornment: <InputAdornment position="start">$</InputAdornment>
									}}
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

export default withReducer('eCommerceApp', reducer)(Product);
