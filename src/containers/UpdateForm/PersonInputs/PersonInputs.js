// DEPENDENCIES
import React, { Fragment } from 'react';

const PersonInputs = (props) => {

	const { newPerson, name, nameHolder, id, change, email, emailHolder } = props;

    return (
        <Fragment>
			<input className="w-100 pa2 ma2" 
			style={{ maxWidth: 400, border: '1px solid rgb(92,92,92)' }} 
			type="text" name={newPerson ? `newName[${id}]` : name} 
			onChange={change} placeholder={nameHolder} 
			pattern=".{3,25}" required={newPerson ? true : false} title="3 to 25 characters"/>
			<input className="w-100 pa2 ma2" 
			style={{ maxWidth: 400, border: '1px solid rgb(92,92,92)' }} 
			type="email" name={newPerson ? `newEmail[${id}]` : email} 
			onChange={change} placeholder={emailHolder} required={newPerson ? true : false} />
			<hr className="w-100 mv3" style={{ maxWidth: 400, border: '0.2px solid rgb(92,92,92)' }} />
		</Fragment>
    );
};

PersonInputs.displayName = 'PersonInputs';

export default PersonInputs;
