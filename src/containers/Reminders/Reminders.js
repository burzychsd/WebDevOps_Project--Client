import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateNote, getUpdatedNotes, removeNote } from '../../actions/updateNotes';
import { noteMenuItemsReset, noteMenuActive } from '../../actions/noteMenu';
import { showModal } from '../../actions/modal';
import { invertColor } from '../../helpers/InvertColor/InvertColor';
import { interpolateColors } from '../../helpers/InterpolateColors/InterpolateColors';
import { hex2RGB } from '../../helpers/HexToRGB/HexToRGB';
import NoteContainer from '../../components/NoteContainer';
import { NoteDisplayTitle, NoteDisplayText, NoteDisplayButtons, NoteDisplayList, NoteDisplayListItem } from '../../components/NoteDisplay';
import Modal from '../../components/Modal';
import Confirmation from '../../components/Confirmation';
import { ReactComponent as EmptyReminders } from './empty-reminders.svg';
import styles from './Reminders.module.scss';

class Reminders extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			updatedNotes: this.props.updatedNotes,
            currentNoteId: this.props.current
		}
	}

	componentDidUpdate(prevProps, prevState) {
        if(prevProps.updatedNotes !== this.props.updatedNotes) {
            this.setState({ updatedNotes: this.props.updatedNotes });
        }

        if(prevProps.current !== this.props.current) {
            this.setState({ currentNoteId: this.props.current });
        }
    }

	componentDidMount() {
		this.props.getUpdatedNotes('reminders');
	}

    handleCloseModal = () => {
        this.props.showModal();
        this.props.noteMenuItemsReset();
    }

    handleConfirmation = (status) => {

        const updatedNoteReminders = {
        	alarm: ''
        }

        if (this.props.remindersBtn) {
            this.props.updateNote(this.state.currentNoteId, updatedNoteReminders, 'reminders');
            this.props.showModal();
            this.props.noteMenuItemsReset();
            this.props.noteMenuActive(null, this.state.currentNoteId);
            this.props.removeNote(this.state.currentNoteId, 'reminders');
        }
    }

    render() {

    	const notes = this.state.updatedNotes.map(note => {
                const colors = interpolateColors(`${hex2RGB(note.color)}`, 'rgb(235,235,235)', 5).map(el => `rgb(${el.join(',')})`);
                const colorValue = `${note.color !== '#EBEBEB' ? invertColor(note.color, 'bw') : 'rgb(64,64,64)'}`;
                const items = note.list.map((item, i) => 
                    <NoteDisplayListItem key={i} item={item} color={colorValue} />
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
            	{this.props.openModal && <Modal clicked={this.handleCloseModal}>
                {(this.props.remindersBtn) && 
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
    removeNote 
})(Reminders);