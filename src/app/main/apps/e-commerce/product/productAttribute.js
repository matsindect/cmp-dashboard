import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { makeStyles } from '@material-ui/core/styles';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { getProductAttributes, selectProductAttributes} from './../store/productAttributesSlice'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import { selectOrderById } from '../store/ordersSlice';
import { Typography } from '@material-ui/core';

export default function ProductAttributesForm(props){
    const [inputList, setInputList] = useState([{ key: '', value: '' }]);
    const {form, setForm} = props;
    const [variant, setVariant] = useState([]);
    const [attributes, setAttributes] = React.useState([]);
    const product_attributes = useSelector(selectProductAttributes)

    const handleAddClick = () => {
		setInputList([...inputList, { key: '', value: '', unit:'' }]);
	};

	function handleChipChange(value, name) {
		setForm(
			_.set(
				{ ...form },
				name,
				value.map(item => item)
			)
		);
	}

    const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
		form.product_attributes = list;
	};

    function getVariant(value) {

		product_attributes.map((attrib)=>{
				if(String(attrib._id) === String(value.map(item => {return item.value})[0])){
					attrib.variants.map(state =>{
						setVariant([...variant, state]);
						console.log(state)
					})
					
				}
		
	})}

    const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
		form.product_attributes = list;
	};

    const classes = useStyles()

    const handleAttributeSelected = (attribute) => {
        if(!attributes.includes(attribute)){
            setAttributes(attributes.concat(attribute))
        }else{
            const attrbs = attributes.filter(item=>item!==attribute)
            setAttributes(attrbs);
        }
    }


    return(
        <div>
        
        {inputList.map((x, i) => {
            return (
                <div className="box">
                    <div className={classes.root}>
                       
                        <Button className={classes.btn} onClick={()=>handleAttributeSelected("Location Equipment")}  variant="contained" color={attributes.includes("Location Equipment") ? "red": "primary"}>
                          Location Equipment
                        </Button>
                        <Button className={classes.btn} onClick={()=>handleAttributeSelected("Crane Capacity (In Tons)")} variant="contained" color={attributes.includes("Crane Capacity (In Tons)") ? "red": "primary"}>
                           Crane Capacity (In Tons)
                        </Button>
                        <Button className={classes.btn} onClick={()=>handleAttributeSelected("Options")} variant="contained" color={attributes.includes("Options") ? "red": "primary"}>
                          Options
                        </Button>
                        <Button className={classes.btn} onClick={()=>handleAttributeSelected("Rates")} variant="contained" color={attributes.includes("Rates") ? "red": "primary"}>
                             Rates
                        </Button>      

                         <Button className={classes.btn} onClick={()=>handleAttributeSelected("Capacity / Tonnage")} variant="contained" color={attributes.includes("Capacity / Tonnage") ? "red": "primary"}>
                            Capacity / Tonnage
                        </Button>              
                    </div>
                    {/**
                     * <FuseChipSelect
                        className="mt-8 mb-16"
                        value={form.product_attributes.map(item => ({
                            value: item.value,
                            label: item.label
                        }))}
                        onChange={value => {handleChipChange(value, 'product_attributes'); getVariant(value)}}
                        placeholder="Select city of product attribute"
                        textFieldProps={{
                            label: 'Product Attributes',
                            InputLabelProps: {
                                shrink: true
                            },
                            variant: 'outlined'
                        }}
                        options={product_attributes.map(item => ({
                            value: item._id,
                            label: item.name
                        }))}
                        isMulti
                    />
                    {variant > 0 && 
                    
                    <FuseChipSelect
                        className="mt-8 mb-16"
                        value={variant.map(item => ({
                            value: item,
                            label: item
                        }))}
                        onChange={value => {handleChipChange(value, 'variant')}}
                        placeholder="Select  product variant"
                        textFieldProps={{
                            label: 'Product Attributes',
                            InputLabelProps: {
                                shrink: true
                            },
                            variant: 'outlined'
                        }}
                        options={variant[0].map(item => ({
                                value: item._id,
                                label: item.label
                        }))}
                        isMulti
                    />}
                    <FormControl variant="filled" className={classes.formControl}>
                        <TextField
                            className="mt-8 mb-16"
                            required
                            label="Value"
                            autoFocus
                            id="value"
                            name="value"
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
                     */}
                    
                </div>
            );
        })}

    <div style={{display: 'flex', justifyContent:"space-around"}}>
        {attributes.map((item)=>(
            <Typography> {item} </Typography>
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
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
        marginTop: 20
      },
      btn: {
          height: 60
      }
}));