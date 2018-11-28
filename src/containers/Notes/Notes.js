import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { invertColor } from '../../helpers/InvertColor/InvertColor';
import { interpolateColors } from '../../helpers/InterpolateColors/InterpolateColors';
import { hex2RGB } from '../../helpers/HexToRGB/HexToRGB';
import CreateNoteBtn from '../../components/CreateNoteBtn';
import NoteContainer from '../../components/NoteContainer';
import CreateNoteForm from '../../components/CreateNoteForm';
import Modal from '../../components/Modal';
import AlarmInput from '../../components/AlarmInput';
import PersonsInputs from '../../components/PersonsInputs';
import ColorInput from '../../components/ColorInput';
import NoteMoreMenu from '../../components/NoteMoreMenu';
import Comfirmation from '../../components/Comfirmation';
import { ReactComponent as MoreBtn } from './more.svg';
import { showForm } from '../../actions/createNoteForm';
import { 
    updateBtnStatus, 
    archiveBtnStatus, 
    binBtnStatus, 
    noteMenuItemsReset } from '../../actions/noteMenu';
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
    name: [],
    email: [],
    color: '#EBEBEB'
}

const { title, text, alarm, name, email, color } = initialState;

class Notes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState,
            notes: this.props.notes,
            noteMenu: {}
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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
        this.props.showForm();
        this.setState({ title, text, alarm, name, email, color });

        setTimeout(() => {
            this.props.renderNotes();
        }, 100);
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

    handleNoteMenu = (event, id) => {
        this.setState((state) => { return state.noteMenu[id] = !state.noteMenu[id] });
    } 

    handleNoteMenuList = (e, id) => {
        if (this.state.noteMenu[id]) {
            this.props.showModal();
        }

        e.target.innerHTML === 'Update' ? this.props.updateBtnStatus() : 
        e.target.innerHTML === 'Move to Archive' ? this.props.archiveBtnStatus() : 
        e.target.innerHTML === 'Move to Bin' ? this.props.binBtnStatus() : 
        this.props.noteMenuItemsReset()
    }

    componentWillUnmount() {
        return this.props.noteForm ? this.props.showForm() : null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.notes !== this.props.notes) {
            this.setState({ notes: this.props.notes });
        }
    }

    componentDidMount() {
        this.props.renderNotes();
        this.props.removeAllInputs();
    }

    render() {

        const notes = this.state.notes.map(note => {
                const colors = interpolateColors(`${hex2RGB(note.color)}`, 'rgb(235,235,235)', 5).map(el => `rgb(${el.join(',')})`);
                const colorValue = `${note.color !== '#EBEBEB' ? invertColor(note.color, 'bw') : 'rgb(64,64,64)'}`;
                return (
                    <NoteContainer active={false} key={note._id} color={colors}>
                        <h1 className={styles.NoteTitle} 
                        style={{ 
                            color: colorValue
                        }}>{note.title}</h1>
                        <p style={{ 
                            color: colorValue 
                        }} className={styles.NoteText}>{note.text}</p>
                        <div className={`${styles.ButtonContainer} w-100 flex justify-between items-center mt4 relative`}>
                            <NoteMoreMenu 
                            show={this.state.noteMenu[note._id]} 
                            clicked={(e) => this.handleNoteMenuList(e, note._id)}
                            color={colorValue} />
                            <div className={`${styles.MoreBtn} flex items-center`} onClick={(e) => this.handleNoteMenu(e, note._id)}>
                                <MoreBtn />
                            </div>
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
                    change={this.handleMultipleInputs}
                    name={this.state.name}
                    email={this.state.email} />}
                    {this.props.colorBtn && <ColorInput color={this.state.color} change={this.handleChange} />}
                    {(this.props.archiveBtn || this.props.binBtn) && 
                    <Comfirmation 
                    update={this.props.updateBtn}
                    archive={this.props.archiveBtn}
                    bin={this.props.binBtn} />}
                </Modal>}
                {notes.reverse()}
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
    noteMenu: state.menu.noteMenu,
    updateBtn: state.menu.updateBtn,
    archiveBtn: state.menu.archiveBtn,
    binBtn: state.menu.binBtn
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
    removeAllInputs,
    updateBtnStatus,
    archiveBtnStatus,
    binBtnStatus,
    noteMenuItemsReset
})(Notes);
