import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { invertColor } from '../../helpers/InvertColor/InvertColor';
import { interpolateColors } from '../../helpers/InterpolateColors/InterpolateColors';
import { hex2RGB } from '../../helpers/HexToRGB/HexToRGB';
import { isDuplicate } from '../../helpers/IsDuplicate/IsDuplicate';
import CreateNoteBtn from '../../components/CreateNoteBtn';
import NoteContainer from '../../components/NoteContainer';
import CreateNoteForm from '../../components/CreateNoteForm';
import Modal from '../../components/Modal';
import AlarmInput from '../../components/AlarmInput';
import PersonsInputs from '../../components/PersonsInputs';
import ColorInput from '../../components/ColorInput';
import { ReactComponent as MoreBtn } from './more.svg';
import { showForm } from '../../actions/createNoteForm';
import { createNote } from '../../actions/createNote';
import { renderNotes } from '../../actions/renderNotes';
import { showModal } from '../../actions/modal';
import { 
    alarmClicked, 
    personsClicked, 
    colorClicked, 
    resetClicked } from '../../actions/createNoteFormButtons';
import { addInput } from '../../actions/personsInputs';
import { removeAllInputs } from '../../actions/personsInputs';
import styles from './Notes.module.scss';

const obj = {};

const initialState = {
    title: 'Title',
    text: 'Your text...',
    alarm: '',
    name: '',
    email: '',
    color: '#EBEBEB'
}

const { title, text, alarm, name, email, color } = initialState;

class Notes extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState,
            notes: this.props.notes
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleMultipleInputs = (event) => {
        obj[event.target.name] = event.target.value;
    }

    handleAcceptPerson = (event, name, email, acceptBtn, removeBtn) => {
        const arrOfNames = Object.keys(obj).filter(key => key.includes('name')).map(key => obj[key]);
        const arrOfEmails = Object.keys(obj).filter(key => key.includes('email')).map(key => obj[key]);
        const condition = !arrOfNames.includes('') && !arrOfEmails.includes('');

        if (arrOfNames.length > 0 && arrOfEmails.length > 0 && condition) {
            this.setState((state) => { 
                return { 
                    name: name && email ? [...state.name, name].filter((a, i, arr) => arr.indexOf(a) === i) : [...state.name],
                    email: name && email ? [...state.email, email].filter((a, i, arr) => arr.indexOf(a) === i) : [...state.email] 
                } 
            });

            if ((name && email))   {
                this.props.addInput();
                acceptBtn.style.display = 'none';
                removeBtn.style.display = 'block';
            }
        }
    }

    handleRemovePerson = (name, email) => {
        const names = Array.isArray(this.state.name) ? this.state.name.filter(val => val !== name) : this.state.name;
        const emails = Array.isArray(this.state.name) ? this.state.email.filter(val => val !== email) : this.state.email;
        this.setState({
                name: isDuplicate(this.state.name, name) && (Boolean(obj['name[0]'])) ? this.state.name : names, 
                email: isDuplicate(this.state.email, email) && (Boolean(obj['email[0]'])) ? this.state.email : emails 
        });
    }

    handleCancel = () => {
        this.props.showForm();
        this.props.removeAllInputs();
        this.setState({ title, text, alarm, name, email, color });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const note = {
            title: this.state.title,
            text: this.state.text,
            alarm: this.state.alarm,
            name: JSON.stringify(this.state.name),
            email: JSON.stringify(this.state.email),
            color: this.state.color 
        }
        this.props.createNote(note);
        this.props.renderNotes();
        this.props.showForm();
        this.setState({ title, text, alarm, name, email, color });
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

    handleColorBtn = () => {
        this.props.showModal();
        this.props.colorClicked();
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

        const notes = this.state.notes.map(note => {
                const colors = interpolateColors(`${hex2RGB(note.color)}`, 'rgb(235,235,235)', 5).map(el => `rgb(${el.join(',')})`);
                return (
                    <NoteContainer active={false} key={note._id} color={colors}>
                        <h1 className={styles.NoteTitle} 
                        style={{ 
                            color: `${note.color !== '#EBEBEB' ? invertColor(note.color, 'bw') : 'rgb(64,64,64)'}` 
                        }}>{note.title}</h1>
                        <p style={{ 
                            color: `${note.color !== '#EBEBEB' ? invertColor(note.color, 'bw') : 'rgb(64,64,64)'}` 
                        }} className={styles.NoteText}>{note.text}</p>
                        <div className={`${styles.MoreBtn} flex items-center mt3`}>
                            <MoreBtn />
                        </div>
                    </NoteContainer>
                );
            }
        );

        return (
            <Fragment>
            	<h1>Notes</h1>
            	<CreateNoteBtn click={this.props.showForm} /> 
	            <NoteContainer active={true} show={this.props.noteForm}>
	            		<CreateNoteForm
                        title={this.state.title} 
                        text={this.state.text}
                        change={this.handleChange}
                        cancel={this.handleCancel}
                        submit={this.handleSubmit}
                        alarmBtn={this.handleAlarmBtn}
                        personsBtn={this.handlePersonsBtn}
                        colorBtn={this.handleColorBtn} />
	            </NoteContainer>
                {this.props.openModal && <Modal clicked={this.handleCloseModal}>
                    {this.props.alarmBtn && <AlarmInput alarm={this.state.alarm} change={this.handleChange} />}
                    {this.props.personsBtn && <PersonsInputs data={obj} 
                    accept={this.handleAcceptPerson} 
                    remove={this.handleRemovePerson} 
                    change={this.handleMultipleInputs} />}
                    {this.props.colorBtn && <ColorInput color={this.state.color} change={this.handleChange} />}
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
    addInput,
    removeAllInputs })(Notes);
