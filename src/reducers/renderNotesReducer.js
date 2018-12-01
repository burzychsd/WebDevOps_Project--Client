import { RENDER_NOTES, UPDATE_NOTES } from '../actions/actionTypes';

const initialState = {
	notes: []
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case RENDER_NOTES:
            return {
                ...state,
                notes: [...action.newNote]
            }
        case UPDATE_NOTES:
            const updatedNotes = state.notes.filter(note => note._id !== action.id);
            return {
                ...state,
                notes: [...updatedNotes]
            }
        default: 
            return state;
    }
}