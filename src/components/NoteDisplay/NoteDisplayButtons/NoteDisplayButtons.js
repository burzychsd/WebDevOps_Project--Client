// DEPENDENCIES
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { 
    updateBtnStatus, 
    archiveBtnStatus, 
    binBtnStatus,
    recoveryBtnStatus,
    remindersBtnStatus,
    deleteBtnStatus, 
    noteMenuItemsReset,
    noteMenuActive,
    getCurrentNote,
    showModal 
} from '../../../actions';

// COMPONENTS
import NoteMoreMenu from '../../NoteMoreMenu';
import { ReactComponent as MoreBtn } from './more.svg';

// STYLES
import styles from './NoteDisplayButtons.module.scss';

class NoteDisplayButtons extends Component {
	constructor(props) {
		super(props);
        const { noteMenu } = this.props;
		this.state = {
			noteMenu
		}
	}

	componentDidUpdate(prevProps, prevState) {
        const { noteMenu } = this.props;
        if(prevProps.noteMenu !== noteMenu) {
            this.setState({ noteMenu });
        }
    }

    handleNoteMenuList = (e, id) => {

        const { getCurrentNote, showModal, updateBtnStatus, 
                archiveBtnStatus, binBtnStatus, recoveryBtnStatus, 
                deleteBtnStatus, remindersBtnStatus, noteMenu, 
                noteMenuItemsReset } = this.props;

        getCurrentNote(id);

        if (noteMenu[id]) {
            showModal();
        }

        e.target.innerHTML === 'Update' ? updateBtnStatus() : 
        e.target.innerHTML === 'Move to Archive' ? archiveBtnStatus() : 
        e.target.innerHTML === 'Move to Bin' ? binBtnStatus() : 
        e.target.innerHTML === 'Back to Notes' ? recoveryBtnStatus() : 
        e.target.innerHTML === 'Delete permanently' ? deleteBtnStatus() : 
        e.target.innerHTML === 'Alarm Cancel' ? remindersBtnStatus() :  
        noteMenuItemsReset()
    }

	render() {

        const { id, component, color, noteMenuActive } = this.props;
        const { noteMenu } = this.state;
		return (
			<div className={`${styles.ButtonsContainer} w-100 flex justify-between items-center mt4 relative`}>
				<NoteMoreMenu
                status={component} 
				show={noteMenu[id]} 
				clicked={(e) => this.handleNoteMenuList(e, id)}
				color={color} />
				<div className={`${styles.MoreBtn} flex items-center`} onClick={(e) => noteMenuActive(e, id)}>
				    <MoreBtn />
				</div>
			</div>
		);
	}
};

NoteDisplayButtons.displayName = 'NoteDisplayButtons';

const mapStateToProps = (state) => ({
	noteMenu: state.menu.isActive
});

export default connect(mapStateToProps, { 
	updateBtnStatus, 
    archiveBtnStatus, 
    binBtnStatus,
    recoveryBtnStatus,
    deleteBtnStatus,
    remindersBtnStatus, 
    noteMenuItemsReset,
    noteMenuActive,
    getCurrentNote,
    showModal
 })(NoteDisplayButtons);
