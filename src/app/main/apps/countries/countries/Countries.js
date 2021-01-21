import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import CountriesHeader from './CountiresHeader';
import CountriesTable from './CountrieTable';

function Countries() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CountriesHeader />}
			content={<CountriesTable />}
			innerScroll
		/>
	);
}

export default withReducer('cmpCountriesMain', reducer)(Countries);
