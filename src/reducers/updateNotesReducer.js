import { UPDATE_NOTE, GET_UPDATED_NOTES, REMOVE_NOTE, DELETE_NOTE } from '../actions/actionTypes'; 

const initialState = {
	archiveNotes: [],
	deletedNotes: [],
	msg: ''
}

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_NOTE:
			return {
				...state,
				msg: action.msg.msg
			}
		case DELETE_NOTE:
			const notes1 = state.deletedNotes.filter(note => note._id !== action.id);
			return {
				...state,
				deletedNotes: notes1
			}
		case GET_UPDATED_NOTES:
			if (action.status === 'archive') {
				return {
					...state,
					archiveNotes: [...action.newNote]
				}
			} else {
				return {
					...state,
					deletedNotes: [...action.newNote]
				}
			}
		case REMOVE_NOTE:
			if (action.status === 'archive') {
				const notes2 = state.archiveNotes.filter(note => note._id !== action.id);
				return {
					...state,
					archiveNotes: notes2
				}
			} else {
				const notes3 = state.deletedNotes.filter(note => note._id !== action.id);
				return {
					...state,
					deletedNotes: notes3
				}
			} 
		default:
			return state;
	}
}