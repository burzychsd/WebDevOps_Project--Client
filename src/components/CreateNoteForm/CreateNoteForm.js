// DEPENDENCIES
import React from 'react';

// COMPONENTS
import { ReactComponent as AlarmIcon } from './alarm.svg';
import { ReactComponent as PersonsIcon } from './persons.svg';
import { ReactComponent as ColorIcon } from './color.svg';
import TitleInput from './TitleInput';
import TextInput from './TextInput';
import ListInputs from './ListInputs';

// STYLES
import styles from './CreateNoteForm.module.scss';

const CreateNoteForm = (props) => {

    const { title, change, list, text, alarmBtn, personsBtn, colorBtn, cancel, submit } = props;

    return (
        <form className="w-100 flex flex-column justify-center pt3 ph2" style={{ background: '#EBEBEB', borderRadius: 25 }} onSubmit={submit}>
        	<TitleInput status={true} title={title} change={change} />
            {!list && <TextInput status={true} text={text} change={change} />}
            {list && <ListInputs status={true} change={change} />}
            <div className="w-100 mt3 flex justify-between align-center">
                <div className="flex justify-center self-center">
                    <AlarmIcon onClick={alarmBtn} className="mh2" style={{ cursor: 'pointer' }} />
                    <PersonsIcon onClick={personsBtn} className="mh2" style={{ cursor: 'pointer' }} />
                    <ColorIcon onClick={colorBtn} className="mh2" style={{ cursor: 'pointer' }} />
                </div>
                <div className="flex justify-center self-end">
                    <button className={styles.NoteFormButtons} type="submit">Submit</button>
                    <p className="mh1" style={{ fontWeight: 700, cursor: 'default' }} >|</p>
                    <button className={styles.NoteFormButtons} type="button" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </form>
    );
};

CreateNoteForm.displayName = 'CreateNoteForm';



export default CreateNoteForm;
