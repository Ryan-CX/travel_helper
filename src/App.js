import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api/index';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
	const [places, setPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
	const [bounds, setBounds] = useState(null);

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
		console.log(coordinates, bounds);
		getPlacesData(bounds.sw, bounds.ne).then((data) => {
			console.log(data);
			setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
		});
	}, [coordinates, bounds]);

	return (
		<div>
			<CssBaseline />
			<Header />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List places={places} />
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						coordinates={coordinates}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default App;
