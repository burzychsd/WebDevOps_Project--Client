import React from 'react';
import { ReactComponent as ListBtn } from './list-icon.svg';
import styles from './CreateNoteBtn.module.scss';

const CreateNoteBtn = (props) => {
    return (
    	<div className={styles.BtnContainer}>
    		<button onClick={props.click} >Create new note...</button>
    		<ListBtn className={styles.ListBtn} />
    	</div>
    );
};

CreateNoteBtn.displayName = 'CreateNoteBtn';

export default CreateNoteBtn;
