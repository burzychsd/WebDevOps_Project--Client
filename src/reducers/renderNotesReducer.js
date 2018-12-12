import { RENDER_NOTES, UPDATE_NOTES, NO_MATCH } from '../actions/actionTypes';

const initialState = {
	notes: [],
    error: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case RENDER_NOTES:
            return {
                ...state,
                notes: [...action.newNotes],
                error: action.error
            }
        case UPDATE_NOTES:
            const updatedNotes = state.notes.filter(note => note._id !== action.id);
            return {
                ...state,
                notes: [...updatedNotes]
            }
        case NO_MATCH:
            return {
                ...state,
                error: action.error
            }
        default: 
            return state;
    }
}