import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import CreateNoteBtn from '../../components/CreateNoteBtn';
import NoteContainer from '../../components/NoteContainer';
import CreateNoteForm from '../../components/CreateNoteForm';
import Modal from '../../components/Modal';
import { showForm } from '../../actions/createNoteForm';
import { createNote } from '../../actions/createNote';
import { renderNotes } from '../../actions/renderNotes';
import { showModal } from '../../actions/modal';
import styles from './Notes.module.scss';

class Notes extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Title',
            text: 'Your text...',
            notes: this.props.notes
        }

        this.NoteContainer = React.createRef();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCancel = () => {
        this.props.showForm();
        this.setState({ title: 'Title', text: 'Your text' });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const note = {
            title: this.state.title,
            text: this.state.text
        }
        this.props.createNote(note);
        this.props.renderNotes();
        this.props.showForm();
        this.setState({ title: 'Title', text: 'Your text' });
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
                        submit={this.handleSubmit} />
	            </NoteContainer>
                {this.props.openModal && <Modal clicked={this.props.showModal}/>}
                {notes}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    noteForm: state.noteForm.showForm,
    notes: state.renderNotes.notes,
    openModal: state.modal.showModal
});

export default connect(mapStateToProps, { showForm, createNote, renderNotes, showModal })(Notes);
