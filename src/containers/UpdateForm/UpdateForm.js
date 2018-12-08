import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getPersons } from '../../actions/persons';
import { updateNote } from '../../actions/updateNotes';
import { showModal } from '../../actions/modal';
import { renderNotes } from '../../actions/renderNotes';
import { noteMenuItemsReset } from '../../actions/noteMenu';
import { removeAllInputs } from '../../actions/inputs';
import TitleInput from '../../components/CreateNoteForm/TitleInput';
import TextInput from '../../components/CreateNoteForm/TextInput';
import ListInputs from '../../components/CreateNoteForm/ListInputs';
import AlarmInput from '../../components/AlarmInput';
import ColorInput from '../../components/ColorInput';
import { ReactComponent as AddBtn } from './add-btn.svg'; 
import { ReactComponent as RemoveBtn } from './removeBtn.svg';
import PersonInputs from './PersonInputs';
import { ReactComponent as SubmitBtn } from '../../components/PersonsInputs/acceptBtn.svg'; 
import styles from './UpdateForm.module.scss';

const initialState = {
	title: '',
    text: '',
    alarm: '',
    name: [],
    email: [],
    list: [],
    color: '',
    newInputs: []
}


class UpdateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	...initialState,
            currentNoteId: this.props.current
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handlePersonData = () => {
        return new Promise((resolve) => {
            this.props.getPersons();
            resolve();
        });
    }

    loadData = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const note = this.props.notes.filter(note => note._id === this.props.current); 
                const properPerson = this.props.persons.filter(person => note[0].persons.includes(person._id));
                const names = properPerson.map(person => person['name']);
                const emails = properPerson.map(person => person['email']);

                this.setState((state) => { 
                    return { 
                        name: state.name.concat(names),
                        email: state.email.concat(emails)
                    } 
                });

                resolve();
            }, 400);
        })
    }

    setInputsState = () => {
        let inputsState = {};
        this.state.name.forEach((person, i) => {
            inputsState[`updatedName${i}`] = person;
            inputsState[`updatedEmail${i}`] = this.state.email[i];
        });

        return this.setState({ ...inputsState });
    }

    handleInput = (e, status) => {
    	const id = 'newInput' + Math.random();
    	const condition = status === "add";

    	this.setState((state) => {
    		return { 
    			newInputs: condition && state.newInputs.length === 0 ? [id] : 
    			condition && state.newInputs.length !== 0 ? state.newInputs.concat([id]) : 
    			[...state.newInputs.filter((input, i, arr) => input !== arr[arr.length - 1])]  
    		} 
    	});
    }

    handleRemoveItem = (item) => {
        this.setState((state) => { 
            const filtered = state.list.filter((el) => el !== item);
            return { list: filtered.length !== 0 ? filtered : [null]} 
        });
    }

    updateData = () => {
        return new Promise((resolve) => {
            const arr = Object.keys(this.state);
            let keys = [];
            const updatedNames = arr.filter(key => key.includes('updatedName')).map(key => {
                keys.push(key);
                return this.state[key];
            });
            const updatedEmails = arr.filter(key => key.includes('updatedEmail')).map(key => this.state[key]);
            const newNames = arr.filter(key => key.includes('newName')).map(key => this.state[key]);
            const newEmails = arr.filter(key => key.includes('newEmail')).map(key => this.state[key]);
            const newList = arr.filter(key => key.includes('newListItem')).map(key => this.state[key]);
            const updatedNote = {
                title: this.state.title,
                text: this.state.text,
                alarm: this.state.alarm,
                color: this.state.color,
                updatedNames: updatedNames.length > 0 ? JSON.stringify(updatedNames) : null,
                updatedEmails: updatedEmails.length > 0 ? JSON.stringify(updatedEmails) : null,
                newNames: newNames.length > 0 ? JSON.stringify(newNames) : null,
                newEmails: newEmails.length > 0 ? JSON.stringify(newEmails) : null,
                keys: keys.length > 0 ? JSON.stringify(keys) : null,
                list: JSON.stringify(this.state.list),
                newList: JSON.stringify(newList)
            };
            this.props.updateNote(this.state.currentNoteId, updatedNote, 'update');
            this.props.showModal();
            this.props.noteMenuItemsReset();
            resolve();
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.updateData().then(this.handlePersonData());
        this.props.removeAllInputs();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.current !== this.props.current) {
            this.setState({ currentNoteId: this.props.current });
        }
    }

    componentDidMount() {
    	const note = this.props.notes.filter(note => note._id === this.props.current)[0];
    	this.handlePersonData().then(this.loadData()).then(setTimeout(() => { this.setInputsState() }, 400));
    	const properDate = note.alarm ? 
        moment(note.alarm).toISOString().split('').splice(0, 16).join('') : '';

    	this.setState(
    		{ 
    			title: note.title, 
    			text: note.text, 
    			alarm: properDate, 
    			color: note.color,
                list: note.list
    		}
    	);
    }

    componentWillUnmount() {
        this.props.removeAllInputs();
    }

    render() {

    	const { title, text, alarm, color, name, email, newInputs } = this.state;

    	const persons = name.map((person, i) => {
			return (
				<PersonInputs key={i}
				new={false} 
				id={i}
                name={`updatedName${i}`}
                email={`updatedEmail${i}`} 
				nameHolder={name[i]} 
				emailHolder={email[i]}
				change={this.handleChange} />
			);
    	});

    	let newPersons;

    	if (newInputs) {
    		newPersons = newInputs.map((person, i) => {
	    		return (
	    			<Fragment key={i}>
	    				<div className="w-100 flex justify-between items-center mb3" 
	    				style={{ maxWidth: 400, height: 35 }}>
							<h3 className="ma0 pa0">New Person</h3>
							<RemoveBtn className={`${styles.RemoveBtn} pointer`} 
							onClick={(e) => this.handleInput(e)} />
	    				</div>
	    				<PersonInputs
	    				new={true} 
						id={i} 
						nameHolder='Full Name'
						emailHolder='Email'
						change={this.handleChange} />
	    			</Fragment>
	    		);
	    	})
    	}

        return (
            <Fragment>
            	<h1 className="tc">Update Note</h1>
            	<form className="flex flex-column justify-center items-center" onSubmit={this.handleSubmit}>
            		<TitleInput status={false} title={title} change={this.handleChange} />
            		{this.state.list.length === 0 ? 
                        <TextInput status={false} text={text} change={this.handleChange} /> : 
                        <div className="mt3 mb4">
                            <h2 className="tc mt0 mb3">List</h2>
                            <ListInputs 
                            status={false} 
                            list={this.state.list} 
                            remove={this.handleRemoveItem}
                            change={this.handleChange} />
                        </div>
                    }
            		<AlarmInput status={false} alarm={alarm} change={this.handleChange} />
            		<ColorInput status={false} color={color} change={this.handleChange} />
            		<h2 className="tc mt0">Persons</h2>
            		<AddBtn className={`${styles.AddBtn} mb3 pointer`} 
            		onClick={(e) => this.handleInput(e, 'add')} />
					{persons}
					{newPersons}
                    <h3 className="mb1">Submit</h3>
                    <label>
                        <input type="submit" />
                        <SubmitBtn className={`${styles.SubmitBtn} mv2 pointer`} />
                    </label>
            	</form>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
	current: state.menu.current,
	notes: state.renderNotes.notes,
	persons: state.persons.persons,
    listItems: state.inputs.listItems
});

export default connect(mapStateToProps, { 
    getPersons, 
    updateNote, 
    showModal, 
    renderNotes,
    noteMenuItemsReset,
    removeAllInputs 
})(UpdateForm);
