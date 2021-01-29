import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
import TextField from '@material-ui/core/TextField';

Geocode.setApiKey('AIzaSyDBMARSuk2l-TxaUBlHY3m5RVb7bN2C08c');
Geocode.enableDebug();
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			city: '',
			area: '',
			state: '',
			country: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		};
	}
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray),
					country = this.getCountry(addressArray);

				console.log('city', city, area, state);

				this.setState({
					address: address ? address : '',
					area: area ? area : '',
					city: city ? city : '',
					state: state ? state : ''
				});
				var location = {
					coordinates: [this.props.center.lng, this.props.center.lat],
					city: city ? city : '',
					state: state ? state : '',
					area: area ? area : '',
					address: address ? address : '',
					country: country ? country : ''
				};
				console.log(location);
				this.props.handleLocationChange(location);
			},
			error => {
				console.error(error);
			}
		);
	}
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state
		) {
			return true;
		} else if (this.props.center.lat === nextProps.center.lat) {
			return false;
		}
	}
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = addressArray => {
		let city = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
				city = addressArray[i].long_name;
				return city;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getArea = addressArray => {
		let area = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0]) {
				for (let j = 0; j < addressArray[i].types.length; j++) {
					if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
						area = addressArray[i].long_name;
						return area;
					}
				}
			}
		}
	};
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = addressArray => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};

	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCountry = addressArray => {
		let country = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
					country = addressArray[i].long_name;
					console.log(country);
					return country;
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
		var location = {
			coordinates: [this.state.markerPosition.lng, this.state.markerPosition.lat],
			city: this.state.city,
			state: this.state.state,
			area: this.state.area,
			address: this.state.address,
			country: this.state.country
		};
		console.log(location);
		this.props.handleLocationChange(location);
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = event => {};
	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = place => {
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray),
			country = this.getCountry(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: address ? address : '',
			area: area ? area : '',
			city: city ? city : '',
			state: state ? state : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			}
		});
		var location = {
			coordinates: [lngValue, latValue],
			city: city ? city : '',
			state: state ? state : '',
			area: area ? area : '',
			address: address ? address : '',
			country: country ? country : ''
		};
		console.log(location);
		this.props.handleLocationChange(location);
	};
	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = event => {
		console.log('event', event);
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng(),
			addressArray = [];
		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray),
					country = this.getCountry(addressArray);
				this.setState({
					address: address ? address : '',
					area: area ? area : '',
					city: city ? city : '',
					state: state ? state : ''
				});
				var location = {
					coordinates: [newLng, newLat],
					city: city ? city : '',
					state: state ? state : '',
					area: area ? area : '',
					address: address ? address : '',
					country: country ? country : ''
				};
				console.log(location);
				this.props.handleLocationChange(location);
			},
			error => {
				console.error(error);
			}
		);
	};
	render() {
		const AsyncMap = withScriptjs(
			withGoogleMap(props => (
				<GoogleMap
					google={this.props.google}
					defaultZoom={this.props.zoom}
					defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
				>
					{/* For Auto complete Search Box */}
					<Autocomplete
						style={{
							width: '100%',
							height: '40px',
							paddingLeft: '16px',
							marginTop: '2px',
							marginBottom: '100px'
						}}
						onPlaceSelected={this.onPlaceSelected}
						types={['(regions)']}
					/>
					{/*Marker*/}
					<Marker
						google={this.props.google}
						name={'Dolores park'}
						draggable={true}
						onDragEnd={this.onMarkerDragEnd}
						position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
					/>
					<Marker />
					{/* InfoWindow on top of marker */}
					<InfoWindow
						onClose={this.onInfoWindowClose}
						position={{ lat: this.state.markerPosition.lat + 0.0018, lng: this.state.markerPosition.lng }}
					>
						<div>
							<span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
						</div>
					</InfoWindow>
				</GoogleMap>
			))
		);
		let map;
		if (this.props.center.lat !== undefined) {
			map = (
				<div>
					<div>
						<TextField
							className="mt-8 mb-16"
							label="City"
							type="text"
							name="city"
							onChange={this.onChange}
							readOnly="readOnly"
							value={this.state.city}
							variant="outlined"
							fullWidth
						/>
						<TextField
							className="mt-8 mb-16"
							label="Area"
							type="text"
							name="area"
							onChange={this.onChange}
							readOnly="readOnly"
							value={this.state.area}
							variant="outlined"
							fullWidth
						/>
						<TextField
							className="mt-8 mb-16"
							label="State"
							type="text"
							name="state"
							onChange={this.onChange}
							readOnly="readOnly"
							value={this.state.state}
							variant="outlined"
							fullWidth
						/>
						<TextField
							className="mt-8 mb-16"
							label="Address"
							type="text"
							name="address"
							onChange={this.onChange}
							readOnly="readOnly"
							value={this.state.address}
							variant="outlined"
							fullWidth
						/>
					</div>
					<AsyncMap
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBMARSuk2l-TxaUBlHY3m5RVb7bN2C08c&libraries=places"
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: this.props.height }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				</div>
			);
		} else {
			map = <div style={{ height: this.props.height }} />;
		}
		return map;
	}
}
export default Map;