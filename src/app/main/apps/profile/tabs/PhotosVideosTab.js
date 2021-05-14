import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function PhotosVideosTab() {
	


    const images = [
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/shutterstock_55264171.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/Sino-shear-stud-with-chamfer.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/HTB1GCjeKVXXXXbCXVXXq6xXFXXX7.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/Strainer.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/8797660872734.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/liebherr-A904C-wheeled-excavator-1.jpg",
        "https://www.abantu.constructionmarket-me.com/cmps/public//images/t3.jpg",
    ]

	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
				
						<div key={2} className="mb-48">
							<ListSubheader component="div" className="flex items-center px-0 mb-24">
								<Typography variant="h6">Pipeline Strainers</Typography>
								
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
												<IconButton>
													<Icon className="text-white opacity-75">info</Icon>
												</IconButton>
											}
										/>
									</GridListTile>
								))}
							</GridList>
						</div>
				
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default PhotosVideosTab;
