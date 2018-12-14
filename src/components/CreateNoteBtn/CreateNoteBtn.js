// DEPENDENCIES
import React from 'react';

// COMPONENTS
import { ReactComponent as ListBtn } from './list-icon.svg';

// STYLES
import styles from './CreateNoteBtn.module.scss';

const CreateNoteBtn = (props) => {
    return (
    	<div className={styles.BtnContainer}>
    		<button className='noselect' onClick={props.click} >Create new note...</button>
    		<ListBtn className={styles.ListBtn} onClick={props.list} />
    	</div>
    );
};

CreateNoteBtn.displayName = 'CreateNoteBtn';

export default CreateNoteBtn;
