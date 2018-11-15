import React from 'react';

const CreateNoteForm = (props) => {
    return (
        <form className="w-100 flex flex-column justify-center pt3 ph2">
        	<input className="ph2 mb3" type="text" name="title" value={props.title} onChange={props.change} />
        	<textarea className="pa2" name="text" value={props.text} onChange={props.change} />
        	<div className="mt3 flex justify-center self-end">
        		<button type="submit">Submit</button>
        		<p className="mh2">|</p>
        		<button>Cancel</button>
        	</div>
        </form>
    );
};

CreateNoteForm.displayName = 'CreateNoteForm';

export default CreateNoteForm;
