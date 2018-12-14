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

    componentWillUnmount() {
        this.props.renderNotes();
    }

	componentDidMount() {
		this.props.getUpdatedNotes('delete');
	}

    handleCloseModal = () => {
        this.props.showModal();
        this.props.noteMenuItemsReset();
    }

    handleConfirmation = (status) => {

        const updatedNoteArchive = {
            deleted: status ? true : false
        }

        if (this.props.recoveryBtn) {
            this.props.updateNote(this.state.currentNoteId, updatedNoteArchive, 'delete');
            this.props.showModal();
            this.props.noteMenuItemsReset();
            this.props.noteMenuActive(null, this.state.currentNoteId);
            this.props.removeNote(this.state.currentNoteId, 'delete');
        }

        if(this.props.deleteBtn) {
        	this.props.deleteNote(this.state.currentNoteId);
            this.props.showModal();
            this.props.noteMenuItemsReset();
            this.props.noteMenuActive(null, this.state.currentNoteId);
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
                        <NoteDisplayButtons component='Bin' color={colorValue} 
                        id={note._id} />
                    </NoteContainer>
                );
            }
        );

        return (
            <Fragment>
                <h1>Bin</h1>
                {this.props.openModal && <Modal clicked={this.handleCloseModal}>
                {(this.props.recoveryBtn || this.props.deleteBtn) && 
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