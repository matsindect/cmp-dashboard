
import TextField from '@material-ui/core/TextField';
import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {selectServices} from '../store/servicesSlice'
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import {selectBusinessTypes} from '../store/businessTypesSlice';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import {selectSectors} from "../store/sectorsSlice";

export default function  ServiceForm(props){
    const {form, handleChange, setForm} = props;
	const classes = useStyles(props);
    const services= useSelector(selectServices);
    const business_types = useSelector(selectBusinessTypes);
    const sector_arr = useSelector(selectSectors);

    function handleChipChange(value, name) {
		setForm(
			_.set(
				{ ...form },
				name,
				value.map(item => item)
			)
		);
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

    function setFeaturedImage(id) {
		setForm(_.set({ ...form }, 'featuredImageId', id));
	}

    return(
        <div>
            <TextField
                className="mt-8 mb-16"
                error={form.name === ''}
                required
                label="Name"
                autoFocus
                id="name"
                name="name"
                value={form.name}
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
                value={form.parent.map(item => ({
                    value: item.value,
                    label: item.label
                }))}
                onChange={value => handleChipChange(value, 'parent')}
                placeholder="Select multiple parents"
                textFieldProps={{
                    label: 'Parent service',
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
                className="mt-8 mb-24"
                value={form.business_types.map(item => ({
                    value: item.value,
                    label: item.label
                }))}
                onChange={value => handleChipChange(value, 'business_types')}
                placeholder="Select multiple business types"
                textFieldProps={{
                    label: 'Business types',
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
                className="mt-8 mb-24"
                value={form.sectors.map(item => ({
                    value: item.value,
                    label: item.label
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
                options={sector_arr.map(item => ({
                    value: item._id,
                    label: item.name
                }))}
                isMulti
            />

            <div>
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
                            onClick={() => setFeaturedImage(media._id)}
                            onKeyDown={() => setFeaturedImage(media._id)}
                            role="button"
                            tabIndex={0}
                            className={clsx(
                                classes.productImageItem,
                                'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5',
                                media._id === form.featuredImageId && 'featured'
                            )}
                            key={media._id}
                        >
                            <Icon className={classes.productImageFeaturedStar}>star</Icon>
                            <img
                                className="max-w-none w-auto h-full"
                                src={media.url}
                                alt="product"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
						
    )
}



const useStyles = makeStyles(theme => ({
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