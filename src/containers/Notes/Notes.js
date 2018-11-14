import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CreateNoteBtn from '../../components/CreateNoteBtn';
import NoteContainer from '../../components/NoteContainer';

import { showForm } from '../../actions/createNoteForm';

class Notes extends Component {

    render() {
        return (
            <Fragment>
            	<h1>Notes</h1>
            	<CreateNoteBtn click={this.props.showForm} /> 
	            <NoteContainer show={this.props.noteForm} >
	            		
	            </NoteContainer>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    noteForm: state.noteForm.showForm
});

export default connect(mapStateToProps, { showForm })(Notes);
