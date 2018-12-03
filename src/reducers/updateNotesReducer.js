import { UPDATE_NOTE, GET_UPDATED_NOTES, REMOVE_NOTE, DELETE_NOTE } from '../actions/actionTypes'; 

const initialState = {
	archiveNotes: [],
	deletedNotes: [],
	remindersNotes: [],
	msg: ''
}

const filtered = (arr, id) => {
	const result = arr.filter(note => note._id !== id);
	return result;
}

export default function(state = initialState, action) {
	switch(action.type) {
		case UPDATE_NOTE:
			return {
				...state,
				msg: action.msg.msg
			}
		case DELETE_NOTE:
			
			return {
				...state,
				deletedNotes: filtered(state.deletedNotes, action.id),
				archiveNotes: filtered(state.archiveNotes, action.id),
				remindersNotes: filtered(state.remindersNotes, action.id)
			}
		case GET_UPDATED_NOTES:
			if (action.status === 'archive') {
				return {
					...state,
					archiveNotes: [...action.newNote]
				}
			} else if (action.status === 'reminders') {
				return {
					...state,
					remindersNotes: [...action.newNote]
				}
			} else {
				return {
					...state,
					deletedNotes: [...action.newNote]
				}
			}
		case REMOVE_NOTE:
			if (action.status === 'archive') {
				return {
					...state,
					archiveNotes: filtered(state.archiveNotes, action.id)
				}
			} else if (action.status === 'reminders') {
				return {
					...state,
					remindersNotes: filtered(state.remindersNotes, action.id)
				}
			} else {
				return {
					...state,
					deletedNotes: filtered(state.deletedNotes, action.id)
				}
			} 
		default:
			return state;
	}
}