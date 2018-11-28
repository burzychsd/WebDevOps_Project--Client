import React, { Component, Fragment } from 'react';
import styles from './NoteMoreMenu.module.scss';
import { StaggeredMotion, spring } from 'react-motion';

const items = ['Update', 'Move to Archive', 'Move to Bin'];

class NoteMoreMenu extends Component {

	state = {
		changeVal: false
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ changeVal: true })
		}, 2000)
	}

	render() {
		return (
	        <div className={styles.NoteMoreMenu}>
	    		<ul>
	    			<StaggeredMotion 
	    			defaultStyles={[{o: this.props.show ? 0 : 1}, {o: this.props.show ? 0 : 1}, {o: this.props.show ? 0 : 1}]}
					styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
						return i === 0
						  ? {o: this.props.show ? spring(1) : spring(0)}
						  : {o: spring(prevInterpolatedStyles[i - 1].o)}
					})}>
	    				{interpolatingStyles =>
						    <Fragment>
						      {interpolatingStyles.map((style, i) =>
						        <button 
						        key={i} 
						        style={{ 
						        	opacity: `${this.props.show ? style.o : this.state.changeVal ? style.o : 0}`, 
						        	color: this.props.color }} 
						        onClick={this.props.clicked}
						        disabled={this.props.show ? false : true}>
						        {items[i]}</button>)
						      }
						    </Fragment>
						}
	    			</StaggeredMotion>
	    		</ul>
	        </div>
	    );
	}
};

NoteMoreMenu.displayName = 'NoteMoreMenu';

export default NoteMoreMenu;
