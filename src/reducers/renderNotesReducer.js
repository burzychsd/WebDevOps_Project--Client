import { RENDER_NOTES } from '../actions/actionTypes';

const initialState = {
	notes: []
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case RENDER_NOTES:
            return {
            	...state,
            	notes: action.newNote
            }
        default: 
            return state;
    }
}