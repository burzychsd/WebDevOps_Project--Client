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
		this.state = {
			noteMenu: this.props.noteMenu
		}
	}

	componentDidUpdate(prevProps, prevState) {
        if(prevProps.noteMenu !== this.props.noteMenu) {
            this.setState({ noteMenu: this.props.noteMenu });
        }
    }

    handleNoteMenuList = (e, id) => {

        this.props.getCurrentNote(id);

        if (this.state.noteMenu[id]) {
            this.props.showModal();
        }

        e.target.innerHTML === 'Update' ? this.props.updateBtnStatus() : 
        e.target.innerHTML === 'Move to Archive' ? this.props.archiveBtnStatus() : 
        e.target.innerHTML === 'Move to Bin' ? this.props.binBtnStatus() : 
        e.target.innerHTML === 'Back to Notes' ? this.props.recoveryBtnStatus() : 
        e.target.innerHTML === 'Delete permanently' ? this.props.deleteBtnStatus() : 
        e.target.innerHTML === 'Alarm Cancel' ? this.props.remindersBtnStatus() :  
        this.props.noteMenuItemsReset()
    }

	render() {
		return (
			<div className={`${styles.ButtonsContainer} w-100 flex justify-between items-center mt4 relative`}>
				<NoteMoreMenu
                status={this.props.component} 
				show={this.state.noteMenu[this.props.id]} 
				clicked={(e) => this.handleNoteMenuList(e, this.props.id)}
				color={this.props.color} />
				<div className={`${styles.MoreBtn} flex items-center`} onClick={(e) => this.props.noteMenuActive(e, this.props.id)}>
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
