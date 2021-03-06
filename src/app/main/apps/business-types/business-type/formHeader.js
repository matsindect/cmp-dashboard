
import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { saveBusinessType} from '../store/businessTypeSlice';
import _ from '@lodash';
import { Link, Redirect } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';

export default function FormHeader(props){
    const {form, sector} = props;
    const [redirect, setRedirect] = React.useState(null)
    const dispatch = useDispatch();

    const theme = useTheme();
  
    function canBeSubmitted() {
		return form.name.length > 0 && !_.isEqual(sector, form);
	}

    const submitBusinessType = () => {
        dispatch(saveBusinessType(form));
        setRedirect("apps/business-types");
    }

  

    return(
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Typography
                        className="normal-case flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to="/apps/business-types"
                        color="inherit"
                    >
                        <Icon className="text-20">
                            {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                        </Icon>
                        <span className="mx-4">Business Type</span>
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
                                {form.name ? form.name : 'New Business Type'}
                            </Typography>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="caption">Business Type Detail</Typography>
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
                    onClick={() => submitBusinessType()}
                >
                    Save
                </Button>
            </FuseAnimate>
        </div>
    )
}