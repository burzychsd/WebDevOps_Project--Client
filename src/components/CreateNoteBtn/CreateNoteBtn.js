import React from 'react';
import { ReactComponent as ListBtn } from './list-icon.svg';
import styles from './CreateNoteBtn.module.scss';

const CreateNoteBtn = () => {
    return (
    	<div className={styles.BtnContainer}>
    		<button>Create new note...</button>
    		<ListBtn className={styles.ListBtn} />
    	</div>
    );
};

CreateNoteBtn.displayName = 'CreateNoteBtn';

export default CreateNoteBtn;
