import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

export default function ContactPersons(props){
    const {form} = props;
    const [inputList, setInputList] = useState([{ name: '', email: '', cellphone: '', designation: '' }]);

    const classes = useStyles();

    const handleAddClick = () => {
		setInputList([...inputList, { key: '', value: '' }]);
	};

    	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
		form.contact_person = list;
	};

    	// handle click event of the Remove button
	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
		form.contact_person = list;
	};

    return(
        <div>
        {inputList.map((x, i) => {
            return (
                <div className="box">
                    <FormControl variant="filled" className={classes.formControl}>
                        <TextField
                            className="mt-8 mb-16"
                            required
                            label="Name"
                            autoFocus
                            id="name"
                            name="name"
                            onChange={e => handleInputChange(e, i)}
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
                        <TextField
                            className="mt-8 mb-16"
                            required
                            label="Email"
                            autoFocus
                            id="email"
                            name="email"
                            onChange={e => handleInputChange(e, i)}
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
                        <MuiPhoneNumber
                            defaultCountry={'ae'}
                            variant="outlined"
                            label="Phone number"
                            className="mt-8 mb-16"
                            name="cellphone"
                        />
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
                        <TextField
                            className="mt-8 mb-16"
                            required
                            label="Designation"
                            autoFocus
                            id="designation"
                            name="designation"
                            onChange={e => handleInputChange(e, i)}
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
                        <div className="btn-box">
                            {inputList.length !== 1 && (
                                <IconButton
                                    color="primary"
                                    onClick={() => handleRemoveClick(i)}
                                    aria-label="add to shopping cart"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                            {inputList.length - 1 === i && (
                                <AddCircleIcon onClick={handleAddClick} />
                            )}
                        </div>
                    </FormControl>
                </div>
            );
        })}
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