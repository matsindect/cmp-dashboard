import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

function PhotosVideosTab() {
	const [openDialog, setOpenDialog] = React.useState(false);
    const images = [
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/shutterstock_55264171.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/Sino-shear-stud-with-chamfer.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/HTB1GCjeKVXXXXbCXVXXq6xXFXXX7.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/Strainer.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/8797660872734.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/liebherr-A904C-wheeled-excavator-1.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/t3.jpg",
    ]

	const handleClickOpenDialog = () => {
        setOpenDialog(true);
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };

	return (
		<div className="md:flex max-w-4xl">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
				
						<div key={2} className="mb-48">
							<ListSubheader component="div" className="flex items-center px-0 mb-24">
								<Typography variant="h6">All Media</Typography>
							</ListSubheader>

							<GridList className="" spacing={8} cols={0}>
								{images.map(media => (
									<GridListTile
										classes={{
											root: 'w-full sm:w-1/2 md:w-1/4',
											tile: 'rounded-8'
										}}
										key={media}
									>
										<img src={media} alt={"Pipeline Strainers"} />
										<GridListTileBar
											title="Valves"
											actionIcon={
												<IconButton onClick={handleClickOpenDialog}>
													<Icon className="text-white opacity-75">delete</Icon>
												</IconButton>
											}
										/>
									</GridListTile>
								))}
							</GridList>


							<ListSubheader component="div" style={{marginTop: 40}} className="flex items-center px-0 mb-24">
								<Typography variant="h6">All Documents</Typography>
							</ListSubheader>
						</div>

						<Dialog
							open={openDialog}
							keepMounted
							onClose={handleCloseDialog}
							aria-labelledby="alert-dialog-slide-title"
							aria-describedby="alert-dialog-slide-description"
						>
							<DialogTitle id="alert-dialog-slide-title">{"Deleting Media Files?"}</DialogTitle>
							<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								Are you sure you want to delete
							</DialogContentText>
							</DialogContent>
							<DialogActions>
							<Button onClick={handleCloseDialog} color="primary">
								No
							</Button>
							<Button onClick={handleCloseDialog} color="primary">
								Yes
							</Button>
							</DialogActions>
						</Dialog>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default PhotosVideosTab;
