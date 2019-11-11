export const UpdateAllTrains = (trainList) => (dispatch) => {
	dispatch({
		type: 'UPDATE_ALL_TRAINS',
		payload: trainList
	});
};

export const displayPassengersFrom = (value) => (dispatch) => {
	dispatch({
		type: 'DISPLAY_PASSENGERS_FORM',
		payload: value
	});
};
