import React from 'react';
import Textarea from 'react-textarea-autosize';
import styles from './CreateNoteForm.module.scss';
import { ReactComponent as AlarmIcon } from './alarm.svg';
import { ReactComponent as PersonsIcon } from './persons.svg';
import { ReactComponent as ColorIcon } from './color.svg';

const CreateNoteForm = (props) => {

    return (
        <form className="w-100 flex flex-column justify-center pt3 ph2" style={{ background: '#EBEBEB', borderRadius: 25 }} onSubmit={props.submit}>
        	<input className={`${styles.NoteFormInput} ph2`} style={{ height: 50, fontWeight: 700 }} type="text" name="title" value={props.title} onChange={props.change} />
            <Textarea className={`${styles.NoteFormInput} pa2`} 
            style={{ resize: 'none', minHeight: 50 }} name="text" value={props.text} onChange={props.change} />
            <div className="w-100 mt3 flex justify-between align-center">
                <div className="flex justify-center self-center">
                    <AlarmIcon className="mh2" style={{ marginLeft: '1em', cursor: 'pointer' }} />
                    <PersonsIcon className="mh2" style={{ cursor: 'pointer' }} />
                    <ColorIcon className="mh2" style={{ cursor: 'pointer' }} />
                </div>
                <div className="flex justify-center self-end">
                    <button className={styles.NoteFormButtons} type="submit">Submit</button>
                    <p className="mh1" style={{ fontWeight: 700, cursor: 'default' }} >|</p>
                    <button className={styles.NoteFormButtons} type="button" onClick={props.cancel}>Cancel</button>
                </div>
            </div>
        </form>
    );
};

CreateNoteForm.displayName = 'CreateNoteForm';

export default CreateNoteForm;
