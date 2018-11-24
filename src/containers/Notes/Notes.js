import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import CreateNoteBtn from '../../components/CreateNoteBtn';
import NoteContainer from '../../components/NoteContainer';
import CreateNoteForm from '../../components/CreateNoteForm';
import Modal from '../../components/Modal';
import AlarmInput from '../../components/AlarmInput';
import PersonsInputs from '../../components/PersonsInputs';
import { showForm } from '../../actions/createNoteForm';
import { createNote } from '../../actions/createNote';
import { renderNotes } from '../../actions/renderNotes';
import { showModal } from '../../actions/modal';
import { 
    alarmClicked, 
    personsClicked, 
    colorClicked, 
    resetClicked } from '../../actions/createNoteFormButtons';
import { removeAllInputs } from '../../actions/personsInputs';
import styles from './Notes.module.scss';

const obj = {};

const initialState = {
    title: 'Title',
    text: 'Your text...',
    alarm: '',
    name: '',
    email: ''
}

const { title, text, alarm, name, email } = initialState;

class Notes extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState,
            notes: this.props.notes
        }

        this.NoteContainer = React.createRef();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleMultipleInputs = (event) => {
        obj[event.target.name] = event.target.value;
    }

    handleAcceptPerson = (event, name, email) => {
        const arrOfNames = Object.keys(obj).filter(key => key.includes('name')).map(key => obj[key]).filter((val, i, array) => val !== "" && array.indexOf(val) === i);
        const arrOfEmails = Object.keys(obj).filter(key => key.includes('email')).map(key => obj[key]).filter((val, i, array) => val !== "" && array.indexOf(val) === i);

        if (arrOfNames.length > 0) {
            this.setState((state) => { 
                return { name: [...state.name, ...arrOfNames.filter(val => val === name)] } 
            });
        }

        if (arrOfEmails.length > 0) {
            this.setState((state) => { 
                return { email: [...state.email, ...arrOfEmails.filter(val => val === email)] } 
            });
        }

        event.target.style.display = 'none';
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
        this.props.showForm();
        this.props.removeAllInputs();
        this.setState({ title, text, alarm, name, email });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const note = {
            title: this.state.title,
            text: this.state.text,
            alarm: this.state.alarm,
            name: JSON.stringify(this.state.name),
            email: JSON.stringify(this.state.email) 
        }
        this.props.createNote(note);
        this.props.renderNotes();
        this.props.showForm();
        this.setState({ title, text, alarm, name, email });
    }

    handleCloseModal = () => {
        this.props.showModal();
        this.props.resetClicked();
    }

    handleAlarmBtn = () => {
        this.props.showModal();
        this.props.alarmClicked();
    }

    handlePersonsBtn = () => {
        this.props.showModal();
        this.props.personsClicked();
    }

    componentWillUnmount() {
        return this.props.noteForm ? this.props.showForm() : null;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.notes) {
            this.setState({ notes: nextProps.notes });
        }
    }

    componentDidMount() {
        this.props.renderNotes();
    }

    render() {

        const notes = this.state.notes.map(note =>
            <NoteContainer active={false} key={note._id}>
                <h1 className={styles.NoteTitle}>{note.title}</h1>
                <p className={styles.NoteText}>{note.text}</p>
            </NoteContainer>
        );

        return (
            <Fragment>
            	<h1>Notes</h1>
            	<CreateNoteBtn click={this.props.showForm} /> 
	            <NoteContainer active={true} show={this.props.noteForm} >
	            		<CreateNoteForm
                        title={this.state.title} 
                        text={this.state.text}
                        change={this.handleChange}
                        cancel={this.handleCancel}
                        submit={this.handleSubmit}
                        alarmBtn={this.handleAlarmBtn}
                        personsBtn={this.handlePersonsBtn} />
	            </NoteContainer>
                {this.props.openModal && <Modal clicked={this.handleCloseModal}>
                    {this.props.alarmBtn && <AlarmInput alarm={this.state.alarm} change={this.handleChange} />}
                    {this.props.personsBtn && <PersonsInputs data={obj} 
                    accept={this.handleAcceptPerson} 
                    remove={this.handleRemovePerson} 
                    change={this.handleMultipleInputs} />}
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
    colorBtn: state.noteFormButtons.colorBtn
});

export default connect(mapStateToProps, { 
    showForm, 
    createNote, 
    renderNotes, 
    showModal,
    alarmClicked,
    personsClicked,
    colorClicked,
    resetClicked,
    removeAllInputs })(Notes);
