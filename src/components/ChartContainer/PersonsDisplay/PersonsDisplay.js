// DEPENDENCIES
import React, { Fragment } from 'react';
import ReactSwipe from 'react-swipe';

// COMPONENTS
import { ReactComponent as Prev } from './prev.svg';
import { ReactComponent as Next } from './next.svg';

const PersonsDisplay = (props) => {

	let reactSwipeEl;

	const styles = {
		container: {
			overflow: 'hidden',
			visibility: 'hidden',
			position: 'relative',
			height: 250
		},
		wrapper: {
			overflow: 'hidden',
			position: 'relative',
			width: '100%',
			height: '100%'
		},
		child: {
			width: '100%',
			position: 'relative',
			transitionProperty: 'transform'
		}
	}

	const options = {
		startSlide: 0,
		speed: 600,
		auto: 5000,
		continuous: true,
		disableScroll: false,
		stopPropagation: false
	}

	const { persons } = props;

	const personsDisplay = persons.map(person => 
		<div className="h-100 flex flex-column justify-center items-center" style={styles.child} key={person._id}>
			<h3>{person.name}</h3>
			<h4>{person.email}</h4>
		</div>
    )

    return (
        <Fragment>
			<h2 className="tc absolute" style={{ top: '0' }}>Persons</h2>
			<ReactSwipe
			className="w-100 carousel"
			swipeOptions={options}
			childCount={persons.length}
			ref={el => (reactSwipeEl = el)}>
				{personsDisplay}
			</ReactSwipe>
			<div className="flex justify-around items-center absolute" style={{ width: 80, bottom: 0 }}>
				<Prev className="pointer" onClick={() => reactSwipeEl.prev()} />
      			<Next className="pointer" onClick={() => reactSwipeEl.next()} />
			</div>
        </Fragment>
    );
};

PersonsDisplay.displayName = 'PersonsDisplay';

export default PersonsDisplay;
