// DEPENDENCIES
import React from 'react';

const NoteDisplayList = (props) => {
    return (
        <ul className="w-100 mh0 mv2 pa0 list">
        	{props.children}
        </ul>
    );
};

NoteDisplayList.displayName = 'NoteDisplayList';

export default NoteDisplayList;
