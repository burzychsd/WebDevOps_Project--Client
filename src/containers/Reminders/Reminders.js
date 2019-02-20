// DEPENDENCIES
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

// ACTIONS
import { 
    updateNote, 
    getUpdatedNotes, 
    removeNote,
    noteMenuItemsReset, 
    noteMenuActive,
    showModal,
    renderNotes 
} from '../../actions';

// HELPERS
import { invertColor, interpolateColors, hex2RGB } from '../../helpers';

// COMPONENTS
import { 
    NoteContainer,
    NoteDisplayTitle, 
    NoteDisplayText, 
    NoteDisplayButtons, 
    NoteDisplayList, 
    NoteDisplayListItem,
    Modal,
    Confirmation
} from '../../components';
import { ReactComponent as EmptyReminders } from './empty-reminders.svg';

// STYLES
import styles from './Reminders.module.scss';

class Reminders extends Component {

	constructor(props) {
		super(props);
        const { updatedNotes, current } = this.props;
		this.state = {
			updatedNotes,
            currentNoteId: current
		}
	}

	componentDidUpdate(prevProps, prevState) {
        const { updatedNotes, current } = this.props;

        if(prevProps.updatedNotes !== updatedNotes) {
            this.setState({ updatedNotes });
        }

        if(prevProps.current !== current) {
            this.setState({ currentNoteId: current });
        }
    }

    componentWillUnmount() {
        const { renderNotes } = this.props;
        renderNotes();
    }

	componentDidMount() {
        const { getUpdatedNotes } = this.props;
		getUpdatedNotes('reminders');
	}

    handleCloseModal = () => {
        const { showModal, noteMenuItemsReset } = this.props;
        showModal();
        noteMenuItemsReset();
    }

    handleConfirmation = (status) => {

        const { updateNote, showModal, noteMenuItemsReset, 
                noteMenuActive, removeNote, remindersBtn } = this.props;
        const { currentNoteId } = this.state;

        const updatedNoteReminders = {
        	alarm: ''
        }

        if (remindersBtn) {
            updateNote(currentNoteId, updatedNoteReminders, 'reminders');
            showModal();
            noteMenuItemsReset();
            noteMenuActive(null, currentNoteId);
            removeNote(currentNoteId, 'reminders');
        }
    }

    render() {

        const { remindersBtn, openModal } = this.props;
        const { updatedNotes } = this.state;
    	const notes = updatedNotes.map(note => {
                const colors = interpolateColors(`${hex2RGB(note.color)}`, 'rgb(235,235,235)', 5).map(el => `rgb(${el.join(',')})`);
                const colorValue = `${note.color !== '#EBEBEB' ? invertColor(note.color, 'bw') : 'rgb(64,64,64)'}`;
                const items = note.list.map((item, i) => 
                    <NoteDisplayListItem key={shortid.generate()} item={item} color={colorValue} />
                )
                return (
                    <NoteContainer active={false} key={note._id} color={colors}>
                        <NoteDisplayTitle color={colorValue} title={note.title} />
                        {note.list.length === 0 ? 
                            <NoteDisplayText color={colorValue} text={note.text} /> : 
                            <NoteDisplayList>
                                {items}
                            </NoteDisplayList>
                        }
                        <NoteDisplayButtons component='Reminders' color={colorValue} 
                        id={note._id} />
                    </NoteContainer>
                );
            }
        );

        return (
            <Fragment>
            	<h1>Reminders</h1>
            	{openModal && <Modal clicked={this.handleCloseModal}>
                {(remindersBtn) && 
                    <Confirmation click={() => this.handleConfirmation(false)} />
                }
                </Modal>}
            	{notes.length > 0 ? notes : <EmptyReminders className={styles.EmptyReminders} />}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
	updatedNotes: state.update.remindersNotes,
    current: state.menu.current,
    openModal: state.modal.showModal,
    remindersBtn: state.menu.remindersBtn
});

export default connect(mapStateToProps, { 
    getUpdatedNotes,
    showModal,
    noteMenuItemsReset,
    updateNote,
    noteMenuActive,
    removeNote,
    renderNotes 
})(Reminders);