import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import headerStyles from './styles';

const Header = ({ onLoad, onPlaceChanged }) => {
	const classes = headerStyles();
	return (
		<AppBar position='static'>
			<Toolbar className={classes.toolbar}>
				<Typography variant='h5' className={classes.title}>
					Travel Helper
				</Typography>
				<Box display='flex'>
					<Typography variant='h6' className={classes.title}>
						Explore New Places
					</Typography>
					<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search for places'
								classes={{ root: classes.inputRoot, input: classes.inputInput }}
							/>
						</div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
