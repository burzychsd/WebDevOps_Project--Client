// DEPENDENCIES
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Doughnut, Bar } from 'react-chartjs-2';
import moment from 'moment';

// GLOBAL VARIABLES
const dateRefs = [moment().subtract(2, 'months').format('MMMM'), moment().subtract(1, 'months').format('MMMM'), moment().format('MMMM')];

class NotesChart extends Component {
    constructor(props) {
        super(props);
        const { archiveNotes, deletedNotes, remindersNotes, notes } = this.props;
        this.state = {
        	archiveNotes: archiveNotes,
	        deletedNotes: deletedNotes,
	        remindersNotes: remindersNotes,
	        notes: notes
        }
    }

    componentDidUpdate(prevProps, prevState) {

        const { archiveNotes, deletedNotes, remindersNotes, notes } = this.props;

        if(prevProps.archiveNotes !== archiveNotes) {
            this.setState({ archiveNotes: archiveNotes })
        }

        if(prevProps.deletedNotes !== deletedNotes) {
            this.setState({ deletedNotes: deletedNotes })
        }

        if(prevProps.remindersNotes !== remindersNotes) {
            this.setState({ remindersNotes: remindersNotes })
        }

        if(prevProps.notes !== notes) {
            this.setState({ notes: notes })
        }
    }

    checkData = (data, arr) => {
    	const datesData = data.map(el => arr.filter(a => moment(a.date).format('MMMM').includes(el)));
    	return datesData;
    }

    render() {
    	const { notes, archiveNotes, deletedNotes, remindersNotes } = this.state;
    	const allNotes = [...notes, ...archiveNotes, ...deletedNotes];
    	const barData = this.checkData(dateRefs, allNotes).map((arr, i) => { return { x: moment().month(dateRefs[i]), y: arr.length } });
    	const allNotesLength = [notes.length, archiveNotes.length, deletedNotes.length, remindersNotes.length];
    	
    	const data = {
          datasets: [{
            data: allNotesLength,
            backgroundColor: ['#FFFFEA', '#00CECB', '#FFED66', '#FF5E5B']
          }],
          labels: ['Notes', 'Archive-Notes', 'Bin-Notes', 'Reminders']
        };

        const data2 = {
        	datasets: [{
        		data: barData, 
        		backgroundColor: '#FF5E5B',
        		label: 'Notes'
        	}]
        }

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

        const options2 = {
        	layout: {
	            padding: {
	                left: 10,
	                right: 0,
	                top: 20,
	                bottom: 0
	            }
	        },
	        scales: {
	        	yAxes: [{
		            type: 'linear',
		            distribution: 'series',
		            ticks: {
		            	suggestedMin: 0,
                		suggestedMax: 100
		            }
		        }],
	            xAxes: [{
	                type: 'time',
	                distribution: 'series',
	                time: {
	                	min: moment().subtract(2, 'months'),
	                    max: moment(),
	                    unit: 'month'
	                },
	                ticks: {
	                	source: 'data',
	                	bounds: 'ticks'
	                }
	            }]
	        }
        }

        const { status, chart } = this.props;

        return status && chart === 'Doughnut' ?
        (
        	<Doughnut data={data} width={220} height={197} options={options} /> 	
        ) : status && chart === 'Bar' ? 
        (
        	<Bar data={data2} width={130} height={110} options={options2} />
        ) : 
        (
            <Fragment>
                <h2 className="absolute" style={{ top: 0 }}>Notes</h2>
            	<div className="w-100 h-100 flex flex-column justify-center items-center">
    				<h3 className="mb0 pa0">Reminders: {remindersNotes.length}</h3>
    				<h3 className="mb0 pa0">Archive: {archiveNotes.length}</h3>
    				<h3 className="mb0 pa0">Bin: {deletedNotes.length}</h3>
            	</div>
            </Fragment>
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
