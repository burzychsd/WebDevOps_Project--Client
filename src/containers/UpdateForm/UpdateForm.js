import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getPersons } from '../../actions/persons';
import TitleInput from '../../components/CreateNoteForm/TitleInput';
import TextInput from '../../components/CreateNoteForm/TextInput';
import AlarmInput from '../../components/AlarmInput';
import ColorInput from '../../components/ColorInput';
import { ReactComponent as AddBtn } from './add-btn.svg'; 
import { ReactComponent as RemoveBtn } from './removeBtn.svg';
import PersonInputs from './PersonInputs'; 
import styles from './UpdateForm.module.scss';

const initialState = {
	title: '',
    text: '',
    alarm: '',
    name: [],
    email: [],
    color: '',
    newInputs: []
}


class UpdateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	...initialState
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handlePersonData = () => {

    	this.props.getPersons();

    	const promise = new Promise((resolve) => {
			setTimeout(() => {
				const note = this.props.notes.filter(note => note._id === this.props.current);
				const properPerson = this.props.persons.filter(person => note[0].persons.includes(person._id));
				const names = properPerson.map(person => person['name']);
		    	const emails = properPerson.map(person => person['email']);
		    	resolve(this.setState((state) => { 
		    		return { 
		    			name: state.name.concat(names),
		    			email: state.email.concat(emails)
		    		} 
		    	}));
			}, 200);
    	});

    	promise.then(res => res);
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

    componentDidMount() {
    	const note = this.props.notes.filter(note => note._id === this.props.current)[0];
    	this.handlePersonData();
    	const properDate = moment(note.alarm).format('YYYY-MM-DDTHH:MM:SS');

    	this.setState(
    		{ 
    			title: note.title, 
    			text: note.text, 
    			alarm: note.alarm ? properDate : '', 
    			color: note.color 
    		}
    	);
    }

    render() {

    	const { title, text, alarm, color, name, email } = this.state;

    	const persons = name.map((person, i) => {
			return (
				<PersonInputs key={i}
				new={false} 
				id={i} 
				nameHolder={name[i]} 
				emailHolder={email[i]}
				change={this.handleChange} />
			);
    	});

    	let newPersons;

    	if (this.state.newInputs) {
    		newPersons = this.state.newInputs.map((person, i) => {
	    		return (
	    			<Fragment key={i}>
	    				<div className="w-100 flex justify-between items-center mb3" 
	    				style={{ maxWidth: 400, height: 35 }}>
							<h3 className="ma0 pa0">New Person</h3>
							<RemoveBtn onClick={(e) => this.handleInput(e)} />
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
            	<form className="flex flex-column justify-center items-center">
            		<TitleInput status={false} title={title} change={this.handleChange} />
            		<TextInput status={false} text={text} change={this.handleChange} />
            		<AlarmInput status={false} alarm={alarm} change={this.handleChange} />
            		<ColorInput status={false} color={color} change={this.handleChange} />
            		<h2 className="tc mt0">Persons</h2>
            		<AddBtn className={`${styles.AddBtn} mb3 pointer`} 
            		onClick={(e) => this.handleInput(e, 'add')}/>
					{persons}
					{newPersons}
            	</form>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
	current: state.menu.current,
	notes: state.renderNotes.notes,
	persons: state.persons.persons
});

export default connect(mapStateToProps, { getPersons })(UpdateForm);
