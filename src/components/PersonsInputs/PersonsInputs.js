import React, { Fragment, Component } from 'react';
import { ReactComponent as AcceptBtn } from './acceptBtn.svg';
import { ReactComponent as RemoveBtn } from '../Modal/close.svg';
import { connect } from 'react-redux';
import { removeInput } from '../../actions/personsInputs';
import styles from './PersonsInputs.module.scss';

class PersonsInputs extends Component {

	handleRemoveInput = (event, removeBtn, name, email) => {
		this.props.remove(name, email);
		removeBtn.style.display = 'none';
	}

	render() {

		const arr = this.props.arrOfInputs;
		const names = this.props.name;
		const emails = this.props.email;

		const inputs = arr.map((key, i) => 
			<div className="flex flex-column justify-center items-center" key={key}>
				<form className={styles.PersonsForm} onSubmit={(e) => this.props.accept(e, this[`inputName${key}`], this[`inputEmail${key}`])}>
					<input className={styles.PersonsInputs} type="text" placeholder="Full Name" name={`name[${i}]`} onChange={this.props.change} ref={(input) => this[`inputName${key}`] = input} pattern=".{3,25}" required title="3 to 25 characters"/>
					<input className={styles.PersonsInputs} type="email" placeholder="Email" name={`email[${i}]`} onChange={this.props.change} ref={(input) => this[`inputEmail${key}`] = input} required />
					<div className="flex justify-center items-center">
						<div ref={(button) => this.acceptBtn = button}>
							<label>
							<input type="submit" />
							<AcceptBtn />
							</label>
						</div>
					</div>
				</form>
	    	</div>
	    );

	    const persons = names.map((el, i) => 
	    	<div className="w-100 flex justify-between items-center ph2 pv3 flex-wrap" style={{ background: '#EBEBEB', maxWidth: 350, margin: '0 auto 1em auto' }} key={i}>
	    		<div className="flex justify-center items-center" style={{ border: 'none', borderRadius: '50%', background: '#FFFFFF', width: 60, height: 60, margin: '1em auto' }}>
	    			<div ref={(button) => this.removeBtn = button}>
	    				<RemoveBtn style={{ height: 20, width: 20 }} onClick={(e) => this.handleRemoveInput(e, this.removeBtn, el, emails[i])} />
	    			</div>
	    		</div>
	    		<div className="flex flex-column justify-center items-center ph3" style={{ margin: '0 auto', width: 200 }}>
					<h3 style={{ wordBreak: 'break-word', margin: '0' }}>{el}</h3>
					<hr className="w-60" />
	    			<h4 style={{ wordBreak: 'break-word', margin: '0.5em 0 0 0' }}>{emails[i]}</h4>
	    		</div>
	    	</div>
	    );

		return (
	    	<Fragment>
	    		<h1 className="tc">Add your people</h1>
	    		{persons}
	    		{inputs}
	    	</Fragment>
	    );
	}
};

PersonsInputs.displayName = 'PersonsInputs';

const mapStateToProps = state => ({
    arrOfInputs: state.personsInputs.arrOfInputs
});

export default connect(mapStateToProps, { removeInput })(PersonsInputs);
