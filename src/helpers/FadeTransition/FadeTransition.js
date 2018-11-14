import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 400;

const defaultStyle = {
      transitionProperty: "opacity",
      transition: `${duration}ms cubic-bezier(.14,.05,.19,1.02)`
};

const transitionStyle = {
	entering: {
		opacity: "0"
	},
	entered: {
		opacity: "1"
	},
	exiting: {
		opacity: "0"
	},
	exited: {
		opacity: "0"
	}
};

const FadeTransition = (props) => {
    return (
        <Transition in={props.showed} timeout={props.duration}>
		  {state => {
		    //State is exited then we return render nothing.
		    if (state === "exited") return null;
		    //Loop on all children and clone new child with a new style applied (transition style).
		    return React.Children.map(props.children, child => {
		      return React.cloneElement(child, {
		        style: Object.assign(
		          {},
		          defaultStyle,
		          transitionStyle[state]
		        )
		      });
		    });
		  }}
		</Transition>
    );
};

FadeTransition.displayName = 'FadeTransition';

export default FadeTransition;
