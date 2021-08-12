import React, { useState } from 'react';
import {
	CircularProgress,
	Grid,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import listStyles from './styles';

const List = () => {
	const classes = listStyles();
	const [type, setType] = useState('restaurant');
	const [rating, setRating] = useState('');

	const places = [
		{ name: 'Cool Place' },
		{ name: 'Another Place' },
		{ name: 'A Third Place' },
		{ name: 'Cool Place' },
		{ name: 'Another Place' },
		{ name: 'A Third Place' },
	];

	return (
		<div className={classes.container}>
			<Typography variant='h4'>
				Restaurant, Hotels and Attractions Around You.
			</Typography>
			<FormControl className={classes.formControl}>
				<InputLabel>Type</InputLabel>
				<Select value={type} onChange={(e) => setType(e.target.value)}>
					<MenuItem value='restaurant'>Restaurant</MenuItem>
					<MenuItem value='hotel'>Hotel</MenuItem>
					<MenuItem value='attraction'>Attraction</MenuItem>
				</Select>
			</FormControl>

			<FormControl className={classes.formControl}>
				<InputLabel>Rating</InputLabel>
				<Select value={rating} onChange={(e) => setRating(e.target.value)}>
					<MenuItem value={0}>All</MenuItem>
					<MenuItem value={3}>Above 3.0</MenuItem>
					<MenuItem value={4}>Above 4.0</MenuItem>
					<MenuItem value={4.5}>Above 4.5</MenuItem>
				</Select>
			</FormControl>
			{/*  Display the places variable  */}
			<Grid container spacing={3} className={classes.list}>
				{places?.map((place, index) => (
					<Grid item xs={12} key={index}>
						<PlaceDetails place={place} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default List;
