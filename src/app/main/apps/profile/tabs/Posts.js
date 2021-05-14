import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Post from './Post'
import Grid from '@material-ui/core/Grid';

export default function Posts(props){
    const classes = useStyles();


    return(
       <Grid container className={classes.root} spacing={1}>
          
               
                {Array.from(Array(26).keys()).map((value) => (
                    <Grid key={value} item xs={12} md={3} lg={3}>
                       <Post />
                    </Grid>
                ))}
               
            
       </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));