import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import React from 'react';
import Posts from './Posts';

function TimelineTab() {




	return (

				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<Posts/>

					
				</FuseAnimateGroup>
			
	);
}

export default TimelineTab;
