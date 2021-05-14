import React from 'react';
import {AppBar, Card, CardContent, Toolbar, Typography} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';

function AboutForm(){
    const classes = useStyles();
    return (
        <div className="md:flex max-w-4xl">
            <div className="flex flex-col flex-1 md:pr-32">
                <form className={classes.root} noValidate autoComplete="off">
                    <Card className="w-full mb-16">
                        <AppBar className={classes.appBar} position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1 font-bold">
                                    Contact Information
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <CardContent>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Contact Person Phone Number</Typography>
                                <Input className={classes.input} defaultValue="+971 09 787 86899" inputProps={{ 'aria-label': 'contact phone' }} />
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Company Phone Number</Typography>
                                <Input className={classes.input} defaultValue="+971 09 787 86899" inputProps={{ 'aria-label': 'comapny phone' }} />
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Landline Number</Typography>
                                <Input className={classes.input} defaultValue="+971 09787868" inputProps={{ 'aria-label': 'landline number' }} />
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Company Address</Typography>
                                <Input className={classes.input} defaultValue="Booking@Gmail.Com" inputProps={{ 'aria-label': 'company address' }} />
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
            <div className="flex flex-col md:w-320">
                <div>
                    <Card className="w-full mb-16">
                        <AppBar className={classes.appBar} position="static" color="secondary" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1 font-bold">
                                    Company Information
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Company</Typography>
                                <Input className={classes.input} defaultValue="Booking" inputProps={{ 'aria-label': 'Company' }} />
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Commercial Regestration</Typography>
                                <Input className={classes.input} defaultValue="Dubai, Sharjah" inputProps={{ 'aria-label': 'Commercial Regestration' }} />
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Key Sector</Typography>
                                <Input className={classes.input} defaultValue="Oil & Gas" inputProps={{ 'aria-label': 'Oil & Gas' }} />
                            </div>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Business Type</Typography>
                                <Input className={classes.input} defaultValue="Plant & Equipment Hire" inputProps={{ 'aria-label': 'Oil & Gas' }} />
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Website</Typography>
                                <Input className={classes.input} defaultValue="example.com" inputProps={{ 'aria-label': 'Oil & Gas' }} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
        </div>
        </div>
    );
}

export default AboutForm;


const useStyles = makeStyles(theme => ({
	input: {
        "&::before":{
            borderBottomColor: 'white !important',
        }
	},
    appBar: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
}));