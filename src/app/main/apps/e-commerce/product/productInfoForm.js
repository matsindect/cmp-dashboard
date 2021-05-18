import React from 'react';
import TextField from '@material-ui/core/TextField';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useSelector } from 'react-redux';
import { selectOrders } from './../store/ordersSlice';
import { selectSectors } from './../store/sectorsSlice';
import _ from '@lodash';

export default function ProductInfoForm(props) {
	const { form, setForm, handleChange } = props;
	const prodcategories = useSelector(selectOrders);
	const sectors = useSelector(selectSectors);

	function handleChipChange(value, name) {
		setForm(
			_.set(
				{ ...form },
				name,
				value.map(item => item)
			)
		);
	}
	return (
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

			<FuseChipSelect
				className="mt-8 mb-24"
				value={form.product_categories.map(item => ({
					value: item.value,
					label: item.label
				}))}
				onChange={value => handleChipChange(value, 'product_categories')}
				placeholder="Select multiple categories"
				textFieldProps={{
					label: 'Product categories',
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
				value={
					form.product_categories &&
					form.product_categories.map(item => ({
						value: item.value,
						label: item.label
					}))
				}
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
				value={
					form.tags &&
					form.tags.map(item => ({
						value: item.value,
						label: item.label
					}))
				}
				onChange={value => handleChipChange(value, 'tags')}
				placeholder="Select Tags"
				textFieldProps={{
					label: 'Tags',
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
				value={
					form.sectors &&
					form.sectors.map(item => ({
						value: item.value,
						label: item.label
					}))
				}
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
	);
}
