import axios from 'axios';

//below is the code snippet from RapidAPI, get restaurant within coordinates boundaries with some modifications
export const getPlacesData = async (type, sw, ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: sw.lat,
					bl_longitude: sw.lng,
					tr_longitude: ne.lng,
					tr_latitude: ne.lat,
				},
				headers: {
					'x-rapidapi-key':
						'f3a4b48122mshc2ebd183c9a0d33p186e68jsn7fc10498a7ce',
					'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
				},
			}
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};
