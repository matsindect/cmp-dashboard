import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function Post(props){
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const names = [
        "Pipeline Strainers",
        "Headed Studs",
        "Office Chairs",
        "Muskan International Manpower Consultancy,",
        "LIEBHERR A 904 C LITRONIC WHEELED EXCAVATOR",
        "Concrete"
    ]

    const images = [
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/shutterstock_55264171.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/Sino-shear-stud-with-chamfer.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/HTB1GCjeKVXXXXbCXVXXq6xXFXXX7.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/Strainer.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/8797660872734.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/liebherr-A904C-wheeled-excavator-1.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/t3.jpg",
    ]

    const statuses = [0, 1]

    return(
        <Card className={classes.root}>
            <CardHeader
                avatar={
                  <Avatar aria-label="pipeline" className={classes.avatar} src={images[Math.floor(Math.random() * images.length)]}/>
                }
                action={
                <IconButton aria-label="active">
                    <FiberManualRecordIcon style={{color: statuses[Math.floor(Math.random() * statuses.length)]===0?"red":"green", fontSize: 20}} />
                </IconButton>
                }
                titleTypographyProps={{className:classes.title}}
                title={names[Math.floor(Math.random() * names.length)]}
                subheader="May 14, 2021"
            />
            <CardMedia
                className={classes.media}
                image={images[Math.floor(Math.random() * images.length)]}
                title="Pipeline Strainers"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                     Generator Powered By Perkins Engine-Standard Generator-Shandong Supermaly
                </Typography>
                <Typography color="textSecondary" className={classes.locText}>
                    <LocationOnIcon/> Abu Dhabi
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="edit">
                     <EditIcon style={{color: 'green'}} />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon style={{color: 'red'}} />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Full description:</Typography>
                <Typography paragraph>
                      Generator Powered By Perkins Engine-Standard Generator-Shandong Supermaly
                </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 350,
      borderRadius: 15,
      marginBottom: 40
    },
    title:{
        fontSize: 15,
        marginBottom: 10
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15
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
    locText:{
        marginTop: 20,
    }
  }));