// DEPENDENCIES
import React, { Fragment } from 'react';

const ColorInput = (props) => {
    return (
        <Fragment>
    		{props.status ? <h1 className="tc">Choose a color</h1> : <h2 className="pa0 mb0">Color</h2>}
        	<input 
        	style={{ margin: props.status ? '0 auto' : '1.5em auto' }} 
        	type="color" name="color" value={props.color} onChange={props.change} />
        </Fragment>
    );
};

ColorInput.displayName = 'ColorInput';

export default ColorInput;
