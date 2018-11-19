import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CreateNoteBtn from '../../components/CreateNoteBtn';
import NoteContainer from '../../components/NoteContainer';
import CreateNoteForm from '../../components/CreateNoteForm';
import { showForm } from '../../actions/createNoteForm';

class Notes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Title',
            text: 'Your text...'
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCancel = () => {
        this.props.showForm();
        this.setState({ title: 'Title', text: 'Your text' });
    }

    componentDidMount() {
        return this.props.noteForm ? this.props.showForm() : null;
    }

    render() {
        return (
            <Fragment>
            	<h1>Notes</h1>
            	<CreateNoteBtn click={this.props.showForm} /> 
	            <NoteContainer active={true} show={this.props.noteForm}>
	            		<CreateNoteForm 
                        title={this.state.title} 
                        text={this.state.text} 
                        change={this.handleChange}
                        cancel={this.handleCancel} />
	            </NoteContainer>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    noteForm: state.noteForm.showForm
});

export default connect(mapStateToProps, { showForm })(Notes);
