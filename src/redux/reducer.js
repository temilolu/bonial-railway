import { combineReducers } from 'redux';

const intialState = {
	displayPassengersForm: true,
	trains: {}
};
const reducer = (state = intialState, action) => {
	switch (action.type) {
		case 'UPDATE_ALL_TRAINS':
			return {
				...state,
				trains: action.payload
			};
			// eslint-disable-next-line
			break;
		case 'DISPLAY_PASSENGERS_FORM':
			return {
				...state,
				displayPassengersForm: action.payload
			};
			// eslint-disable-next-line
			break;
		default:
			return state;
	}
};

export default combineReducers({
	reducer
});
