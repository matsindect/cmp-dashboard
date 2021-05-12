import React from 'react';
import Grid from '@material-ui/core/Grid';
import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import { makeStyles } from '@material-ui/core/styles';

export default function CompanyForm(props){
    const { form, handleChange, setForm } = props;
    const classes = useStyles();
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
                    id="name"
                    name="name"
                    defaultValue={form.company.name&&form.company.name}
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
                    defaultValue={form.company.tel}
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
                    defaultValue={form.company.fax}
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
                    defaultValue={form.company.email}
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
                    defaultValue={form.company.website}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
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