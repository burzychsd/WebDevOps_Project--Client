import React, { Fragment } from 'react';

const AlarmInput = (props) => {
    return (
    	<Fragment>
    		{props.status && <h1 className="tc">Set A Date</h1>}
        	<input className="w-60-l w-85 self-center"
        	style={{ border: '1px solid rgb(92,92,92)' }} 
        	type="datetime-local" name="alarm" value={props.alarm} onChange={props.change} />
        </Fragment>
    );
};

AlarmInput.displayName = 'AlarmInput';

export default AlarmInput;
