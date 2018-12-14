// DEPENDENCIES
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { 
    updateNote, 
    getUpdatedNotes, 
    removeNote, 
    deleteNote,
    noteMenuItemsReset, 
    noteMenuActive,
    showModal,
    renderNotes 
} from '../../actions';

// ACTIONS
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
    Confirmation } from '../../components';
import { ReactComponent as EmptyBin } from './empty-bin.svg';

// STYLES
import styles from './Bin.module.scss';

class Bin extends PureComponent {

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
		getUpdatedNotes('delete');
	}

    handleCloseModal = () => {
        const { showModal, noteMenuItemsReset } = this.props;
        showModal();
        noteMenuItemsReset();
    }

    handleConfirmation = (status) => {

        const { recoveryBtn, updateNote, showModal, noteMenuItemsReset, 
                noteMenuActive, removeNote, deleteBtn, deleteNote } = this.props;
        const { currentNoteId } = this.state;

        const updatedNoteArchive = {
            deleted: status ? true : false
        }

        if (recoveryBtn) {
            updateNote(currentNoteId, updatedNoteArchive, 'delete');
            showModal();
            noteMenuItemsReset();
            noteMenuActive(null, currentNoteId);
            removeNote(currentNoteId, 'delete');
        }

        if(deleteBtn) {
        	deleteNote(currentNoteId);
            showModal();
            noteMenuItemsReset();
            noteMenuActive(null, currentNoteId);
        }

    }

    render() {

        const { openModal, recoveryBtn, deleteBtn } = this.props;
        const { updatedNotes } = this.state;
    	const notes = updatedNotes.map(note => {
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
                        <NoteDisplayButtons component='Bin' color={colorValue} 
                        id={note._id} />
                    </NoteContainer>
                );
            }
        );

        return (
            <Fragment>
                <h1>Bin</h1>
                {openModal && <Modal clicked={this.handleCloseModal}>
                {(recoveryBtn || deleteBtn) && 
                    <Confirmation click={() => this.handleConfirmation(false)} />
                }
                </Modal>}
                {notes.length > 0 ? notes : <EmptyBin className={styles.EmptyBin} />}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
	updatedNotes: state.update.deletedNotes,
    current: state.menu.current,
    openModal: state.modal.showModal,
    deleteBtn: state.menu.deleteBtn,
    recoveryBtn: state.menu.recoveryBtn
});

export default connect(mapStateToProps, {
	getUpdatedNotes,
    showModal,
    noteMenuItemsReset,
    updateNote,
    noteMenuActive,
    removeNote,
    deleteNote,
    renderNotes
})(Bin);