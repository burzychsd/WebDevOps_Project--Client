import React, { Fragment } from 'react';

const ColorInput = (props) => {
    return (
        <Fragment>
    		<h1 className="tc">Choose a color</h1>
        	<input style={{ margin: '0 auto' }} type="color" name="color" value={props.color} onChange={props.change} />
        </Fragment>
    );
};

ColorInput.displayName = 'ColorInput';

export default ColorInput;
