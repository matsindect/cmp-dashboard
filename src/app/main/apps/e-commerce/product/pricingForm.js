import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {getCities, selectCities} from '../store/citiesSlice'
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';

export default function PricingForm(props){
    const {form, setForm, handleChange} = props;
    const cities = useSelector(selectCities);
    const classes = useStyles()

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
                    options={cities.map(item => ({
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
                    type="number"
                    variant="outlined"
                    autoFocus
                    fullWidth
                />
            </FormControl>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	}
}));