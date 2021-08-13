import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api/index';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
	const [places, setPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [childClicked, setChildClicked] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [type, setType] = useState('restaurant');
	const [rating, setRating] = useState('');

	// setting up the search bar
	const [autoComplete, setAutoComplete] = useState(null);
	const onLoad = (autoC) => {
		setAutoComplete(autoC);
	};
	const onPlaceChanged = () => {
		const lat = autoComplete.getPlace().geometry.location.lat();
		const lng = autoComplete.getPlace().geometry.location.lng();
		setCoordinates({ lat, lng });
	};

	//detect user's location using the built-in geolocation API
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);
	//after fetching data from the getPlacesData function with moving the map, set the data to the places state using useEffect, getPlacesData has 2 props, sw and se, which are the bounds of the map. In this case, the bounds are changing based on the user's selection(drag)

	useEffect(() => {
		setIsLoading(true);

		getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
			setPlaces(data);
			setFilteredPlaces([]);
			setIsLoading(false);
		});
	}, [type, coordinates, bounds]);

	// update the list based on rating, if the rating is larger than current selected rating, update the list
	useEffect(() => {
		const filteredPlaces = places.filter((place) => place.rating >= rating);
		setFilteredPlaces(filteredPlaces);
	}, [rating]);

	return (
		<div>
			<CssBaseline />
			<Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					{/* not the best practice to have so much props like this but in this case it's fine since it's only 1 level down App -> List */}
					<List
						places={filteredPlaces.length ? filteredPlaces : places}
						childClicked={childClicked}
						isLoading={isLoading}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						coordinates={coordinates}
						places={filteredPlaces.length ? filteredPlaces : places}
						setChildClicked={setChildClicked}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default App;
