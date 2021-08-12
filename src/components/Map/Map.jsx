import React from 'react';

import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';

import mapStyles from './styles';

const Map = () => {
	const classes = mapStyles();
	const isMobile = useMediaQuery('(min-width: 768px)');
	const coordinates = { lat: 0, lng: 0 }; //set the default location for the map's default center

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
				defaultCenter={coordinates}
				center={coordinates}
				defaultZoom={14}
				margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
				options={''}
				onChange={''}
				onChildClick={''}
			></GoogleMapReact>
		</div>
	);
};

export default Map;
