import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Document, Page, pdfjs } from 'react-pdf';
import Icon from '@material-ui/core/Icon';
import { orange } from '@material-ui/core/colors';
import _ from '@lodash';
import FuseUtils from '@fuse/utils';

export default function MediaForm(props){
    const [numFilename, setNumFilename] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const {form, setForm} = props;
    const classes = useStyles()

    const reader = new FileReader();

    function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
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


    function handleUploadLicenseChange(e) {
		console.log(e.target.files);
		const file = e.target.files[0];
		if (!file) {
			return;
		}

		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `license`, `data:${file.type};base64,${btoa(reader.result)}`));
		};
		setNumFilename(file);
		reader.onerror = () => {
			console.log('error on load image');
		};
	}


    function handleUploadLogoChange(e) {
		console.log(e.target.files);
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `logo`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function handleCatalogueUploadChange(e) {
		console.log(e.target.files);
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
						type: 'image',
						file: file
					},
					...form.products_catalogue
				])
			);
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}


    return(
        <div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
                <p>Logo</p>
            </div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
                <label
                    htmlFor="logo-file"
                    className={clsx(
                        classes.productImageUpload,
                        'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                    )}
                >
                    <input
                        accept="image/*"
                        className="hidden"
                        id="logo-file"
                        type="file"
                        name="logo"
                        onChange={handleUploadLogoChange}
                    />
                    <Icon fontSize="large" color="action">
                        cloud_upload
                    </Icon>
                </label>
                {form.logo ? (
                    <div
                        role="button"
                        tabIndex={0}
                        className={clsx(
                            classes.productImageItem,
                            'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                        )}
                    >
                        <img
                            className="max-w-none w-auto h-full"
                            src={
                                form.logo.startsWith('profile-logo/')
                                    ? `http://localhost:8086/${form.logo}`
                                    : form.logo
                            }
                            alt="product"
                        />
                    </div>
                ) : null}
            </div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
                <p>License</p>
            </div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
                <label
                    htmlFor="license-file"
                    className={clsx(
                        classes.productImageUpload,
                        'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                    )}
                >
                    <input
                        accept="application/pdf"
                        className="hidden"
                        id="license-file"
                        type="file"
                        name="license"
                        onChange={handleUploadLicenseChange}
                    />
                    <Icon fontSize="large" color="action">
                        cloud_upload
                    </Icon>
                </label>
                {form.license ? (
                    <div className="Example">
                        <div className="container">
                            {/* <div className="Example__container__load">
                                <label htmlFor="file">Load from file:</label>{' '}
                                <input onChange={onFileChange} type="file" />
                            </div> */}
                            <div className="document">
                                <Document
                                    file={form.license != '' ? form.license : numFilename}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    options={{
                                        cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                                        cMapPacked: true
                                    }}
                                >
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                    ))}
                                </Document>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
                <p>Gallary images</p>
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
                        name="images"
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
                        <img
                            className="max-w-none w-auto h-full"
                            src={
                                media.url.startsWith('gallary/')
                                    ? `http://localhost:8086/${media.url}`
                                    : media.url
                            }
                            alt="product"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8 mb-8">
                <p>Products catalogue</p>
            </div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
                <label
                    htmlFor="product-file"
                    className={clsx(
                        classes.productImageUpload,
                        'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                    )}
                >
                    <input
                        accept="image/*"
                        className="hidden"
                        id="product-file"
                        name="products_catalogue"
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
                        <Document
                            file={
                                media.url.startsWith('profile-catalogues/')
                                    ? `http://localhost:8086/${media.url}`
                                    : media.file
                            }
                            onLoadSuccess={onDocumentLoadSuccess}
                            options={{
                                cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                                cMapPacked: true
                            }}
                        ></Document>
                    </div>
                ))}
            </div>
        </div>
    )

}

const useStyles = makeStyles(theme => ({
	gridoot: {
		flexGrow: 1,
	  },
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	option: {
		fontSize: 15,
		marginTop: 20,
		marginBottom: 50,
		'& > span': {
		  marginRight: 10,
		  fontSize: 18,
		},
	  },

	select:{
		marginTop: 10,
		marginBottom: 20,
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