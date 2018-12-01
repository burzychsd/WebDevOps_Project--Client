import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateNote, getUpdatedNotes, removeNote } from '../../actions/updateNotes';
import { noteMenuItemsReset, noteMenuActive } from '../../actions/noteMenu';
import { showModal } from '../../actions/modal';
import { invertColor } from '../../helpers/InvertColor/InvertColor';
import { interpolateColors } from '../../helpers/InterpolateColors/InterpolateColors';
import { hex2RGB } from '../../helpers/HexToRGB/HexToRGB';
import NoteContainer from '../../components/NoteContainer';
import { NoteDisplayTitle, NoteDisplayText, NoteDisplayButtons } from '../../components/NoteDisplay';
import Modal from '../../components/Modal';
import Confirmation from '../../components/Confirmation';

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
                return (
                    <NoteContainer active={false} key={note._id} color={colors}>
                        <NoteDisplayTitle color={colorValue} title={note.title} />
                        <NoteDisplayText color={colorValue} text={note.text} />
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
            	{notes}
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
    removeNote 
})(Archive);