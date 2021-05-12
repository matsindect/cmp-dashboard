import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveSupplier } from '../store/supplierSlice';
import _ from '@lodash';

export default function FormHeader(props){
    const {form, handleChangeTab} =props;
    const theme = useTheme();
    const dispatch = useDispatch();

    const supplier = useSelector(({ cmpSupplier }) => cmpSupplier.supplier);

    function canBeSubmitted() {
		return form.company.name.length > 0 && !_.isEqual(supplier, form);
	}

    return(
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
                        <span className="mx-4">{form.company.name} Supplier</span>
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
                                {form.company.name ? form.company.name : 'New Supplier'}
                            </Typography>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="caption">Supplier Detail</Typography>
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