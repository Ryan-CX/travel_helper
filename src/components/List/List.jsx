import React, { useState, useEffect, createRef } from 'react';
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

const List = ({ places, childClicked, isLoading }) => {
	const classes = listStyles();
	const [type, setType] = useState('restaurant');
	const [rating, setRating] = useState('');
	const [eleRefs, setEleRefs] = useState([]); // for click the icon then bring to the details
	//use Array constructor to create as many elements as the number of places
	useEffect(() => {
		setEleRefs((refs) =>
			Array(places?.length)
				.fill()
				.map((_, i) => refs[i] || createRef())
		);
	}, [places]);

	return (
		<div className={classes.container}>
			<Typography variant='h5'>
				Restaurant, Hotels and Attractions Around You.
			</Typography>
			{isLoading ? (
				<div className={classes.loading}>
					<CircularProgress size='5rem' />
				</div>
			) : (
				<>
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
							<Grid ref={eleRefs[index]} item xs={12} key={index}>
								<PlaceDetails
									place={place}
									//make sure to pass the ref whenever the place details is clicked
									selected={Number(childClicked) === index}
									refProp={eleRefs[index]}
								/>
							</Grid>
						))}
					</Grid>
				</>
			)}
		</div>
	);
};

export default List;
