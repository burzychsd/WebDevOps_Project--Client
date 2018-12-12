import React, { Fragment } from 'react';
import moment from 'moment';

const date = moment().toISOString();
const dateValue = moment().format("YYYY-MM-DDTHH:mm");

const AlarmInput = (props) => {
	const condition = moment(date).isAfter(moment(props.alarm).toISOString(), 'minute');
    return (
    	<Fragment>
    		{props.status ? <h1 className="tc">Set A Date</h1> : <h2>Date</h2>}
        	<input className="w-60-l w-85 self-center"
        	style={{ border: '1px solid rgb(92,92,92)' }} 
        	type="datetime-local" name="alarm" 
            value={props.alarm} min={dateValue} onChange={props.change} />
        	{condition && <p className="tc mt3">Choose a further date from the current one</p>}
        </Fragment>
    );
};

AlarmInput.displayName = 'AlarmInput';

export default AlarmInput;