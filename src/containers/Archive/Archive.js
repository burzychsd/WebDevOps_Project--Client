// DEPENDENCIES
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

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
    Confirmation } from '../../components';
import { ReactComponent as EmptyArchive } from './empty-archive.svg';

// STYLES
import styles from './Archive.module.scss';

class Archive extends PureComponent {

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
		this.props.getUpdatedNotes('archive');
	}

    handleCloseModal = () => {
        this.props.showModal();
        this.props.noteMenuItemsReset();
    }

    handleConfirmation = (status) => {

        const updatedNoteArchive = {
            archive: status ? true : false
        }

        const updatedNoteBin = {
            deleted: status ? false : true,
            archive: false
        }

        if (this.props.recoveryBtn) {
            this.props.updateNote(this.state.currentNoteId, updatedNoteArchive, 'archive');
            this.props.showModal();
            this.props.noteMenuItemsReset();
            this.props.noteMenuActive(null, this.state.currentNoteId);
            this.props.removeNote(this.state.currentNoteId, 'archive');
        }

        if (this.props.binBtn) {
            this.props.updateNote(this.state.currentNoteId, updatedNoteBin, 'archive');
            this.props.showModal();
            this.props.noteMenuItemsReset();
            this.props.noteMenuActive(null, this.state.currentNoteId);
            this.props.removeNote(this.state.currentNoteId, 'archive');
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
                        <NoteDisplayButtons component='Archive' color={colorValue} 
                        id={note._id} />
                    </NoteContainer>
                );
            }
        );

        return (
            <Fragment>
            	<h1>Archive</h1>
                {this.props.openModal && <Modal clicked={this.handleCloseModal}>
                {(this.props.recoveryBtn || this.props.binBtn) && 
                    <Confirmation click={() => this.handleConfirmation(false)} />
                }
                </Modal>}
            	{notes.length > 0 ? notes : <EmptyArchive className={styles.EmptyArchive} />}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
	updatedNotes: state.update.archiveNotes,
    current: state.menu.current,
    openModal: state.modal.showModal,
    binBtn: state.menu.binBtn,
    recoveryBtn: state.menu.recoveryBtn
});

export default connect(mapStateToProps, { 
    getUpdatedNotes,
    showModal,
    noteMenuItemsReset,
    updateNote,
    noteMenuActive,
    removeNote,
    renderNotes 
})(Archive);