import React from 'react';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';

export default function MediaForm(props){
    const {form, setForm} = props;

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
    

    const classes = useStyles(props);

    return(
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
    )
}

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