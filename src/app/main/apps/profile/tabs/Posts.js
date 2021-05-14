import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Post from './Post'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function Posts(props){
    const classes = useStyles();


    return(
        <div>
                <Button variant="contained" className={classes.btn} color="primary" href="#outlined-buttons">
                    Add Product
                </Button>
                <Grid container className={classes.root} spacing={1}>
                
               
                {Array.from(Array(26).keys()).map((value) => (
                    <Grid key={value} item xs={12} md={3} lg={3}>
                       <Post />
                    </Grid>
                ))}
               
            
       </Grid>
        </div>
       
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      btn:{
         float: 'right',
         margin:40,
         height: 60,
         width: 200,
         color: 'black !important'
      }
  }));