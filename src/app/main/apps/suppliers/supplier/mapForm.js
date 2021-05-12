import React from 'react';
import Map from './googlemaps';
import _ from '@lodash';

export default function MapForm(props){
    const {form, setForm} = props;

    function handleLocationChange(input) {
		setForm(_.set({ ...form }, 'company.location', input));
	}

    return(
        <Map
            // google={this.props.google}
            center={{
                lat: 23.4241,
                lng: 53.8478
            }}
            height="300px"
            zoom={15}
            // onChange={this.onChange}
            form={form}
            handleLocationChange={handleLocationChange}
        />
    )
}