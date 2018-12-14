// DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import { ReactComponent as BackIcon } from './backBtn.svg';

const BackBtn = () => {
    return (
        <Link className="absolute"  style={{ top: '1.5em', left: '1.5em' }} to="/"><BackIcon /></Link>
    );
};

BackBtn.displayName = 'BackBtn';

export default BackBtn;
