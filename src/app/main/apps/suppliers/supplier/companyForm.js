import React from 'react';
import Grid from '@material-ui/core/Grid';
import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import { makeStyles } from '@material-ui/core/styles';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useSelector } from 'react-redux';
import {selectBusinessTypes} from '../store/businessTypesSlice';

export default function CompanyForm(props){
    const { form, handleChange, setForm } = props;
    const business_types = useSelector(selectBusinessTypes)
    const classes = useStyles();

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
        <Grid container className={classes.root} spacing={4}>
            <Grid item xs={6}>
                <TextField
                    className="mt-8 mb-16"
                    error={form.company.name === ''}
                    type="text"
                    required
                    label="Company Name"
                    autoFocus
                    id="company.name"
                    name="company.name"
                    defaultValue={form.company.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    className="mt-8 mb-16"
                    id="company.about"
                    name="company.about"
                    onChange={handleChange}
                    label="About the company"
                    type="text"
                    defaultValue={form.company.about}
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
                    defaultValue={form.tel}
                    fullWidth
                    className="mt-8 mb-16"
                />
            </Grid>
            <Grid item xs={6}>
                <MuiPhoneNumber
                    defaultCountry={'ae'}
                    variant="outlined"
                    label="Fax"
                    id="fax"
                    name="fax"
                    defaultValue={form.fax}
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
                    defaultValue={form.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    className="mt-8 mb-16"
                    label="Company website"
                    autoFocus
                    type="url"
                    id="website"
                    name="website"
                    defaultValue={form.website}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                />
                <FuseChipSelect
                    className="mt-8 mb-16"
                    value={form.business_types&&form.business_types.map(item => ({
                        value: item,
                        label: item
                    }))}
                    onChange={value => handleChipChange(value, 'business_types')}
                    placeholder="Select business type"
                    textFieldProps={{
                        label: 'Business Types',
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
            </Grid>
        </Grid>
    </div>
    )
}

const useStyles = makeStyles(theme => ({
	gridoot: {
		flexGrow: 1,
	  },
}));