import React, { Component, Fragment } from 'react';
import CreateNoteBtn from '../../components/CreateNoteBtn';

class Notes extends Component {

    render() {
        return (
            <Fragment>
            	<h1>Notes</h1>
            	<CreateNoteBtn />
            </Fragment>
        );
    }
}

export default Notes;
