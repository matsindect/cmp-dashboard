import React from 'react';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import {getProducts, selectProducts} from '../store/productsSlice';
import { getOrders, selectOrders } from '../store/ordersSlice';
import { getSectors, selectSectors } from '../store/sectorsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {getBusinessTypes, selectBusinessTypes} from '../store/businessTypesSlice';

import _ from '@lodash';

export default function ProductsForm(props){
    const {form, setForm} = props;
    const products = useSelector(selectProducts);
    const prodcategories = useSelector(selectOrders);
    const sectors = useSelector(selectSectors);
    const business_types = useSelector(selectBusinessTypes)

	function handleChipChange(value, name) {
		setForm(
			_.set(
				{ ...form },
				name,
				value.map(item => item)
			)
		);
	}

    return(
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
            value={form.company.businesstype}
            onChange={value => handleChipChange(value, 'categories')}
            placeholder="Select business type"
            textFieldProps={{
                label: 'Business Type',
                InputLabelProps: {
                    shrink: true
                },
                variant: 'outlined'
            }}
            options={business_types.map(item => ({
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
            value={form.products.map(item => ({
                value: item,
                label: item
            }))}
            onChange={value => handleChipChange(value, 'products')}
            placeholder="Select products"
            textFieldProps={{
                label: 'Products',
                InputLabelProps: {
                    shrink: true
                },
                variant: 'outlined'
            }}
            options={products.map(item => ({
                value: item._id,
                label: item.name
            }))}
            isMulti
        />
    </div>
    )
}