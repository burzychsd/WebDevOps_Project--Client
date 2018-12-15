// DEPENDENCIES
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

// ACTIONS
import { 
    showForm, 
    closeForm,
    createNote,
    renderNotes, 
    updateNotes,
    noteMenuItemsReset, 
    noteMenuActive,
    showModal,
    alarmStatus,
    listStatus, 
    resetListStatus,
    alarmClicked,
    personsClicked,
    colorClicked,
    resetClicked,
    removeAllInputs,
    updateNote, 
    getUpdatedNotes,
    searchBoxStatus,
    getPersons 
} from '../../actions';

// HELPERS
import { invertColor, interpolateColors, hex2RGB } from '../../helpers';

// COMPONENTS
import {
    CreateNoteBtn,
    NoteContainer,
    CreateNoteForm,
    Modal,
    AlarmInput,
    PersonsInputs,
    ColorInput,
    NoteDisplayTitle,
    NoteDisplayText,
    NoteDisplayButtons, 
    NoteDisplayList,
    NoteDisplayListItem,
    Confirmation 
} from '../../components';
import { ReactComponent as AlarmIcon } from '../../components/CreateNoteForm/alarm.svg';
import UpdateForm from '../UpdateForm';

// GLOBAL VARIABLES
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
        const { notes, current, list } = this.props;
        this.state = {
            ...initialState,
            notes,
            currentNoteId: current,
            listStatus: list
        }
    }

    filteredListItems = (keys) => keys.filter(key => key.includes('listItem'))
                                      .map(key => this.setState({ [key]: '' }));

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOpenForm = () => {
        const { showForm, resetListStatus } = this.props;
        showForm();
        resetListStatus();
    }

    handleMultipleInputs = (event) => {
        obj[event.target.name] = event.target.value;
    }

    handleAcceptPerson = (event, nameEl, emailEl) => {
        event.preventDefault();
        const { name, email } = this.state;
        const arrOfNames = Object.keys(obj).filter(key => key.includes('name')).map(key => obj[key]);
        const arrOfEmails = Object.keys(obj).filter(key => key.includes('email')).map(key => obj[key]);
        const condition1 = !arrOfNames.includes('') && !arrOfEmails.includes('');
        const condition2 = !name.includes(nameEl.value) && !email.includes(emailEl.value);

        if (arrOfNames.length > 0 && arrOfEmails.length > 0 && condition1) {
            this.setState((state) => { 
                return { 
                    name: nameEl.value && emailEl.value && condition2 ? [...state.name, nameEl.value] : state.name,
                    email: nameEl.value && emailEl.value && condition2 ? [...state.email, emailEl.value] : state.email
                } 
            });
        }

        if(nameEl.value && emailEl.value) {
            setTimeout(() => {
                nameEl.value = '';
                emailEl.value = '';
            }, 0.001);
        }
    }

    handleRemovePerson = (nameEl, emailEl) => {
        const { name, email } = this.state;
        const names = Array.isArray(name) ? name.filter(val => val !== nameEl) : name;
        const emails = Array.isArray(name) ? email.filter(val => val !== emailEl) : email;
        this.setState({
                name: names, 
                email: emails 
        });
    }

    handleCancel = () => {
        const { closeForm, removeAllInputs } = this.props;
        closeForm();
        removeAllInputs();
        this.filteredListItems(Object.keys(this.state));
        this.setState({ title, text, alarm, name, email, color, list });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const promise = new Promise((resolve) => {
            const { createNote, closeForm } = this.props;
            const { title, text, alarm, name, email, color} = this.state;
            const keys = Object.keys(this.state);
            const listItems = keys.filter(key => key.includes('listItem')).map(key => this.state[key]);
            const note = { title, text, alarm, name: JSON.stringify(name),
                email: JSON.stringify(email),
                list: listItems ? JSON.stringify(listItems) : [],
                color 
            };
            createNote(note);
            closeForm();
            this.setState({ title, text, alarm, name, email, color, list });
            resolve(keys);
        })

        promise.then((keys) => {
            const { removeAllInputs, renderNotes } = this.props;
            this.filteredListItems(keys);
            removeAllInputs();
            setTimeout(() => renderNotes(), 400);
        });
    }

    handleCloseModal = () => {
        const { showModal, resetClicked, noteMenuItemsReset } = this.props;
        showModal();
        resetClicked();
        noteMenuItemsReset();
    }

    handleAlarmBtn = () => {
        const { showModal, alarmClicked } = this.props;
        showModal();
        alarmClicked();
    }

    handlePersonsBtn = () => {
        const { showModal, personsClicked } = this.props;
        showModal();
        personsClicked();
    }

    handleColorBtn = () => {
        const { showModal, colorClicked } = this.props;
        showModal();
        colorClicked();
    }

    handleListStatus = () => {
        const { showForm, listStatus } = this.props;
        showForm();
        listStatus();
    }

    handleConfirmation = (status) => {

        const { archiveBtn, updateNote, showModal, noteMenuItemsReset, 
                noteMenuActive, updateNotes, binBtn } = this.props;
        const { currentNoteId } = this.state;

        const updatedNoteArchive = {
            archive: status ? true : false
        }

        const updatedNoteBin = {
            deleted: status ? true : false
        }

        if (archiveBtn) {
            updateNote(currentNoteId, updatedNoteArchive, 'archive');
            showModal();
            noteMenuItemsReset();
            noteMenuActive(null, currentNoteId);
            updateNotes(currentNoteId);
        }

        if (binBtn) {
            updateNote(currentNoteId, updatedNoteBin, 'delete');
            showModal();
            noteMenuItemsReset();
            noteMenuActive(null, currentNoteId);
            updateNotes(currentNoteId);
        }

    }

    async componentWillUnmount() {
        const { getUpdatedNotes, searchBoxStatus, getPersons } = this.props;
        await getUpdatedNotes('reminders');
        await getUpdatedNotes('archive');
        await getUpdatedNotes('delete');
        await searchBoxStatus();
        await getPersons();
    }

    componentDidUpdate(prevProps, prevState) {
        const { notes, current, persons, list } = this.props;

        if(prevProps.notes !== notes) {
            this.setState({ notes });
        }

        if(prevProps.current !== current) {
            this.setState({ currentNoteId: current });
        }

        if(prevProps.persons !== persons) {
            this.props.renderNotes();
        }

        if(prevProps.list !== list) {
            this.setState({ listStatus: list });
        }
    }

    async componentDidMount() {
        const { renderNotes, removeAllInputs, alarmStatus, searchBoxStatus } = this.props;
        await removeAllInputs();
        await alarmStatus();
        await searchBoxStatus();
        await renderNotes();
    }

    render() {

        const { noteForm, openModal, archiveBtn, binBtn, alarmBtn, colorBtn, personsBtn, 
                updateBtn, noMatch } = this.props;
        const { notes, title, text, listStatus, alarm, name, email, color } = this.state;
        const notesItems = notes.map(note => {
                const colors = interpolateColors(`${hex2RGB(note.color)}`, 'rgb(235,235,235)', 5).map(el => `rgb(${el.join(',')})`);
                const colorValue = `${note.color !== '#EBEBEB' ? invertColor(note.color, 'bw') : 'rgb(64,64,64)'}`;
                const items = note.list.map((item, i) => 
                    <NoteDisplayListItem key={shortid.generate()} item={item} color={colorValue} />
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
	            <NoteContainer active={true} show={noteForm}>
	            		<CreateNoteForm
                        title={title} 
                        text={text}
                        change={this.handleChange}
                        cancel={this.handleCancel}
                        submit={this.handleSubmit}
                        alarmBtn={this.handleAlarmBtn}
                        personsBtn={this.handlePersonsBtn}
                        colorBtn={this.handleColorBtn}
                        list={listStatus} />
	            </NoteContainer>
                {openModal && <Modal clicked={this.handleCloseModal}>
                    {alarmBtn && <AlarmInput status={true} alarm={alarm} change={this.handleChange} />}
                    {personsBtn && <PersonsInputs data={obj} 
                    accept={this.handleAcceptPerson} 
                    remove={this.handleRemovePerson} 
                    change={this.handleMultipleInputs}
                    name={name}
                    email={email} />}
                    {colorBtn && <ColorInput status={true} color={color} change={this.handleChange} />}
                    {(archiveBtn || binBtn) && 
                    <Confirmation click={() => this.handleConfirmation(true)} />}
                    {updateBtn && <UpdateForm />}
                </Modal>}
                {noMatch !== '' ? 
                    <h1>{noMatch.error}</h1> 
                    : 
                    <Fragment>{notesItems.reverse()}</Fragment>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    noteForm: state.noteForm.showForm,
    notes: state.renderNotes.notes,
    noMatch: state.renderNotes.error,
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
    getUpdatedNotes,
    searchBoxStatus,
    getPersons
})(Notes);
