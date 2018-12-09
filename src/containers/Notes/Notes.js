import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { invertColor } from '../../helpers/InvertColor/InvertColor';
import { interpolateColors } from '../../helpers/InterpolateColors/InterpolateColors';
import { hex2RGB } from '../../helpers/HexToRGB/HexToRGB';
import CreateNoteBtn from '../../components/CreateNoteBtn';
import NoteContainer from '../../components/NoteContainer';
import CreateNoteForm from '../../components/CreateNoteForm';
import { ReactComponent as AlarmIcon } from '../../components/CreateNoteForm/alarm.svg';
import Modal from '../../components/Modal';
import AlarmInput from '../../components/AlarmInput';
import PersonsInputs from '../../components/PersonsInputs';
import ColorInput from '../../components/ColorInput';
import { NoteDisplayTitle, NoteDisplayText, NoteDisplayButtons, NoteDisplayList, NoteDisplayListItem } from '../../components/NoteDisplay';
import Confirmation from '../../components/Confirmation';
import UpdateForm from '../UpdateForm';
import { showForm, closeForm } from '../../actions/createNoteForm';
import { createNote } from '../../actions/createNote';
import { renderNotes, updateNotes } from '../../actions/renderNotes';
import { noteMenuItemsReset, noteMenuActive } from '../../actions/noteMenu';
import { showModal } from '../../actions/modal';
import { alarmStatus } from '../../actions/alarmTimer';
import { listStatus, resetListStatus } from '../../actions/createList';
import { 
    alarmClicked, 
    personsClicked, 
    colorClicked, 
    resetClicked } from '../../actions/createNoteFormButtons';
import { removeAllInputs } from '../../actions/inputs';
import { updateNote, getUpdatedNotes } from '../../actions/updateNotes';

const obj = {};

const initialState = {
    title: 'Title',
    text: 'Your text...',
    alarm: '',
    name: [],
    email: [],
    list: [],
    color: '#EBEBEB'
}

const { title, text, alarm, name, email, color, list } = initialState;

class Notes extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState,
            notes: this.props.notes,
            currentNoteId: this.props.current,
            listStatus: this.props.list
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOpenForm = () => {
        this.props.showForm();
        this.props.resetListStatus();
    }

    handleMultipleInputs = (event) => {
        obj[event.target.name] = event.target.value;
    }

    handleAcceptPerson = (event, name, email) => {
        event.preventDefault();
        const arrOfNames = Object.keys(obj).filter(key => key.includes('name')).map(key => obj[key]);
        const arrOfEmails = Object.keys(obj).filter(key => key.includes('email')).map(key => obj[key]);
        const condition1 = !arrOfNames.includes('') && !arrOfEmails.includes('');
        const condition2 = !this.state.name.includes(name.value) && !this.state.email.includes(email.value);

        if (arrOfNames.length > 0 && arrOfEmails.length > 0 && condition1) {
            this.setState((state) => { 
                return { 
                    name: name.value && email.value && condition2 ? [...state.name, name.value] : state.name,
                    email: name.value && email.value && condition2 ? [...state.email, email.value] : state.email
                } 
            });
        }

        if(name.value && email.value) {
            setTimeout(() => {
                name.value = '';
                email.value = '';
            }, 0.001);
        }
    }

    handleRemovePerson = (name, email) => {
        const names = Array.isArray(this.state.name) ? this.state.name.filter(val => val !== name) : this.state.name;
        const emails = Array.isArray(this.state.name) ? this.state.email.filter(val => val !== email) : this.state.email;
        this.setState({
                name: names, 
                email: emails 
        });
    }

    handleCancel = () => {
        this.props.closeForm();
        this.props.removeAllInputs();
        this.setState({ title, text, alarm, name, email, color, list });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const keys = Object.keys(this.state);
        const listItems = keys.filter(key => key.includes('listItem')).map(key => this.state[key]);
        const note = {
            title: this.state.title,
            text: this.state.text,
            alarm: this.state.alarm,
            name: JSON.stringify(this.state.name),
            email: JSON.stringify(this.state.email),
            list: listItems ? JSON.stringify(listItems) : [],
            color: this.state.color 
        }
        this.props.createNote(note);
        this.props.closeForm();
        this.setState({ title, text, alarm, name, email, color, list });

        setTimeout(() => {
            this.props.removeAllInputs();
            this.props.renderNotes();
        }, 500);
    }

    handleCloseModal = () => {
        this.props.showModal();
        this.props.resetClicked();
        this.props.noteMenuItemsReset();
    }

    handleAlarmBtn = () => {
        this.props.showModal();
        this.props.alarmClicked();
    }

    handlePersonsBtn = () => {
        this.props.showModal();
        this.props.personsClicked();
    }

    handleColorBtn = () => {
        this.props.showModal();
        this.props.colorClicked();
    }

    handleListStatus = () => {
        this.props.showForm();
        this.props.listStatus();
    }

    handleConfirmation = (status) => {

        const updatedNoteArchive = {
            archive: status ? true : false
        }

        const updatedNoteBin = {
            deleted: status ? true : false
        }

        if (this.props.archiveBtn) {
            this.props.updateNote(this.state.currentNoteId, updatedNoteArchive, 'archive');
            this.props.showModal();
            this.props.noteMenuItemsReset();
            this.props.noteMenuActive(null, this.state.currentNoteId);
            this.props.updateNotes(this.state.currentNoteId);
        }

        if (this.props.binBtn) {
            this.props.updateNote(this.state.currentNoteId, updatedNoteBin, 'delete');
            this.props.showModal();
            this.props.noteMenuItemsReset();
            this.props.noteMenuActive(null, this.state.currentNoteId);
            this.props.updateNotes(this.state.currentNoteId);
        }

    }

    componentWillUnmount() {
        this.props.getUpdatedNotes('reminders');
        this.props.getUpdatedNotes('archive');
        this.props.getUpdatedNotes('delete');
        return this.props.noteForm ? this.props.showForm() : null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.notes !== this.props.notes) {
            this.setState({ notes: this.props.notes });
        }

        if(prevProps.current !== this.props.current) {
            this.setState({ currentNoteId: this.props.current });
        }

        if(prevProps.persons !== this.props.persons) {
            this.props.renderNotes();
        }

        if(prevProps.list !== this.props.list) {
            this.setState({ listStatus: this.props.list });
        }
    }

    componentDidMount() {
        this.props.renderNotes();
        this.props.removeAllInputs();
        this.props.alarmStatus();
    }

    render() {

        const notes = this.state.notes.map(note => {
                const colors = interpolateColors(`${hex2RGB(note.color)}`, 'rgb(235,235,235)', 5).map(el => `rgb(${el.join(',')})`);
                const colorValue = `${note.color !== '#EBEBEB' ? invertColor(note.color, 'bw') : 'rgb(64,64,64)'}`;
                const items = note.list.map((item, i) => 
                    <NoteDisplayListItem key={i} item={item} color={colorValue} />
                )
                return (
                    <NoteContainer active={false} key={note._id} color={colors}>
                        {note.alarm && <AlarmIcon className='absolute' 
                        style={{ right: 0, marginRight: '0.85em' }} />}
                        <NoteDisplayTitle color={colorValue} title={note.title} />
                        {note.list.length === 0 ? 
                            <NoteDisplayText color={colorValue} text={note.text} /> : 
                            <NoteDisplayList>
                                {items}
                            </NoteDisplayList>
                        }
                        <NoteDisplayButtons component='Notes' color={colorValue}
                        id={note._id} />
                    </NoteContainer>
                );
            }
        );

        return (
            <Fragment>
            	<h1 ref={(ref) => this.title = ref}>Notes</h1>
            	<CreateNoteBtn click={this.handleOpenForm} list={this.handleListStatus} /> 
	            <NoteContainer active={true} show={this.props.noteForm}>
	            		<CreateNoteForm
                        title={this.state.title} 
                        text={this.state.text}
                        change={this.handleChange}
                        cancel={this.handleCancel}
                        submit={this.handleSubmit}
                        alarmBtn={this.handleAlarmBtn}
                        personsBtn={this.handlePersonsBtn}
                        colorBtn={this.handleColorBtn}
                        list={this.state.listStatus} />
	            </NoteContainer>
                {this.props.openModal && <Modal clicked={this.handleCloseModal}>
                    {this.props.alarmBtn && <AlarmInput status={true} alarm={this.state.alarm} change={this.handleChange} />}
                    {this.props.personsBtn && <PersonsInputs data={obj} 
                    accept={this.handleAcceptPerson} 
                    remove={this.handleRemovePerson} 
                    change={this.handleMultipleInputs}
                    name={this.state.name}
                    email={this.state.email} />}
                    {this.props.colorBtn && <ColorInput status={true} color={this.state.color} change={this.handleChange} />}
                    {(this.props.archiveBtn || this.props.binBtn) && 
                    <Confirmation click={() => this.handleConfirmation(true)} />}
                    {this.props.updateBtn && <UpdateForm />}
                </Modal>}
                {notes}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    noteForm: state.noteForm.showForm,
    notes: state.renderNotes.notes,
    openModal: state.modal.showModal,
    alarmBtn: state.noteFormButtons.alarmBtn,
    personsBtn: state.noteFormButtons.personsBtn,
    colorBtn: state.noteFormButtons.colorBtn,
    updateBtn: state.menu.updateBtn,
    archiveBtn: state.menu.archiveBtn,
    binBtn: state.menu.binBtn,
    msg: state.update.msg,
    current: state.menu.current,
    persons: state.persons.persons,
    list: state.list.listStatus
});

export default connect(mapStateToProps, { 
    showForm,
    closeForm, 
    createNote, 
    renderNotes,
    updateNotes, 
    showModal,
    alarmClicked,
    personsClicked,
    colorClicked,
    resetClicked,
    removeAllInputs,
    noteMenuItemsReset,
    noteMenuActive,
    updateNote,
    alarmStatus,
    listStatus,
    resetListStatus,
    getUpdatedNotes
})(Notes);
