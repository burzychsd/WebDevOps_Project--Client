import React from 'react';
import styles from './CreateNoteForm.module.scss';
import { ReactComponent as AlarmIcon } from './alarm.svg';
import { ReactComponent as PersonsIcon } from './persons.svg';
import { ReactComponent as ColorIcon } from './color.svg';
import TitleInput from './TitleInput';
import TextInput from './TextInput';
import ListInputs from './ListInputs';

const CreateNoteForm = (props) => {

    return (
        <form className="w-100 flex flex-column justify-center pt3 ph2" style={{ background: '#EBEBEB', borderRadius: 25 }} onSubmit={props.submit}>
        	<TitleInput status={true} title={props.title} change={props.change} />
            {!props.list && <TextInput status={true} text={props.text} change={props.change} />}
            {props.list && <ListInputs status={true} change={props.change} />}
            <div className="w-100 mt3 flex justify-between align-center">
                <div className="flex justify-center self-center">
                    <AlarmIcon onClick={props.alarmBtn} className="mh2" style={{ cursor: 'pointer' }} />
                    <PersonsIcon onClick={props.personsBtn} className="mh2" style={{ cursor: 'pointer' }} />
                    <ColorIcon onClick={props.colorBtn} className="mh2" style={{ cursor: 'pointer' }} />
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
