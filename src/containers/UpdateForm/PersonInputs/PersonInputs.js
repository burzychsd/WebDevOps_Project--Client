// DEPENDENCIES
import React, { Fragment } from 'react';

const PersonInputs = (props) => {
    return (
        <Fragment>
			<input className="w-100 pa2 ma2" 
			style={{ maxWidth: 400, border: '1px solid rgb(92,92,92)' }} 
			type="text" name={props.new ? `newName[${props.id}]` : props.name} 
			onChange={props.change} placeholder={props.nameHolder} 
			pattern=".{3,25}" required={props.new ? true : false} title="3 to 25 characters"/>
			<input className="w-100 pa2 ma2" 
			style={{ maxWidth: 400, border: '1px solid rgb(92,92,92)' }} 
			type="email" name={props.new ? `newEmail[${props.id}]` : props.email} 
			onChange={props.change} placeholder={props.emailHolder} required={props.new ? true : false} />
			<hr className="w-100 mv3" style={{ maxWidth: 400, border: '0.2px solid rgb(92,92,92)' }} />
		</Fragment>
    );
};

PersonInputs.displayName = 'PersonInputs';

export default PersonInputs;
