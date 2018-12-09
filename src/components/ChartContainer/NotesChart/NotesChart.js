import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

class NotesChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	archiveNotes: this.props.archiveNotes,
	        deletedNotes: this.props.deletedNotes,
	        remindersNotes: this.props.remindersNotes,
	        notes: this.props.notes
        }
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.archiveNotes !== this.props.archiveNotes) {
        this.setState({ archiveNotes: this.props.archiveNotes })
      }

      if(prevProps.deletedNotes !== this.props.deletedNotes) {
        this.setState({ deletedNotes: this.props.deletedNotes })
      }

      if(prevProps.remindersNotes !== this.props.remindersNotes) {
        this.setState({ remindersNotes: this.props.remindersNotes })
      }

      if(prevProps.notes !== this.props.notes) {
        this.setState({ notes: this.props.notes })
      }
    }

    render() {
    	const { notes, archiveNotes, deletedNotes, remindersNotes } = this.state;
    	const data = {
          datasets: [{
            data: [notes.length, archiveNotes.length, deletedNotes.length, remindersNotes.length],
            backgroundColor: ['#FFFFEA', '#00CECB', '#FFED66', '#FF5E5B']
          }],
          labels: ['Notes', 'Archive-Notes', 'Bin-Notes', 'Reminders']
        };

        const options = {
        	legend: {
        		display: false
        	},
        	layout: {
	            padding: {
	                left: 10,
	                right: 10,
	                top: 10,
	                bottom: 10
	            }
        	},
        	animation: {
        		animateRotate: false
        	}
        }

        return this.props.status ?
        (
        	<Doughnut data={data} width={220} height={197} options={options} /> 	
        ) : 
        (
        	<div className="w-100 flex flex-column justify-center items-center">
				<h2>Notes</h2>
        	</div>
        )
    }
}

const mapStateToProps = (state) => ({
	notes: state.renderNotes.notes,
	archiveNotes: state.update.archiveNotes,
	deletedNotes: state.update.deletedNotes,
	remindersNotes: state.update.remindersNotes
});

export default connect(mapStateToProps, null)(NotesChart);
