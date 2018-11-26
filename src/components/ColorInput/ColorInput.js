import React, { Fragment } from 'react';

const ColorInput = (props) => {
    return (
        <Fragment>
    		<h1 className="tc">Choose a color</h1>
        	<input className="self-center" type="color" name="color" value={props.color} onChange={props.change} />
        </Fragment>
    );
};

ColorInput.displayName = 'ColorInput';

export default ColorInput;
