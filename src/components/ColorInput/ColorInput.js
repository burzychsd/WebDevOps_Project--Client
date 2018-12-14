// DEPENDENCIES
import React, { Fragment } from 'react';

const ColorInput = (props) => {

	const { status, color, change } = props;

    return (
        <Fragment>
    		{status ? <h1 className="tc">Choose a color</h1> : <h2 className="pa0 mb0">Color</h2>}
        	<input 
        	style={{ margin: status ? '0 auto' : '1.5em auto' }} 
        	type="color" name="color" value={color} onChange={change} />
        </Fragment>
    );
};

ColorInput.displayName = 'ColorInput';

export default ColorInput;
