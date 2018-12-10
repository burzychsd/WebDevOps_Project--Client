import React, { PureComponent, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Navigation from '../Navigation';
import ChartContainer from '../../components/ChartContainer';
import NotesChart from '../../components/ChartContainer/NotesChart';
import PersonsDisplay from '../../components/ChartContainer/PersonsDisplay';
import styles from './Dashboard.module.scss';
import { navigationActive } from '../../actions/navigation';
import { getPersons } from '../../actions/persons';
import { updateNote, removeNote, getUpdatedNotes } from '../../actions/updateNotes';
import { renderNotes } from '../../actions/renderNotes';

import Notes from '../Notes';
import Reminders from '../Reminders';
import Archive from '../Archive';
import Bin from '../Bin';
import NotFound from '../../components/NotFound';

const sound = document.getElementById('alarm-sound');
let current;

const routes = [
  {
    path: "/dashboard/notes",
    component: Notes
  },
  {
    path: "/dashboard/reminders",
    component: Reminders
  },
  {
    path: "/dashboard/archive",
    component: Archive
  },
  {
    path: "/dashboard/bin",
    component: Bin
  }
];

class Dashboard extends PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        show: false,
        persons: this.props.persons
      }
    }

    handleSound = () => {
      const promise = new Promise((resolve) => {
        resolve(current);
      });

      promise.then((res) => {
        const { updateNote, renderNotes, removeNote } = this.props;
        const obj = {
          alarm: ''
        }
        updateNote(res, obj, 'reminders');
        removeNote(res, 'reminders');
        setTimeout(() => {
          renderNotes();
          this.setState({ show: false });
        }, 400);
      });
    }

    handlePlay = () => {
      this.setState({ show: true });
      const { notes, alarmTimer } = this.props;
      const notesWithAlarms = notes.filter(note => note.alarm);
      const currentNote = notesWithAlarms.filter(note => 
        moment(
          alarmTimer, "YYYY-MM-DDTHH:mm"
        ).isSame(moment(note.alarm, "YYYY-MM-DDTHH:mm"), 'minute'))[0];
        
      current = currentNote._id;

      if(!this.state.show) {
        sound.pause();
        sound.currentTime = 0;
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.persons !== this.props.persons) {
        this.setState({ persons: this.props.persons });
      }
    }

    componentDidMount() {
      sound.addEventListener('play', this.handlePlay);
      this.props.renderNotes();
      this.props.getUpdatedNotes('reminders');
      this.props.getUpdatedNotes('archive');
      this.props.getUpdatedNotes('delete');
      this.props.getPersons();
    }

    componentWillUnmount() {
      sound.removeEventListener('play', this.handlePlay);
    }

    render() {
        const { location, match } = this.props;
        const { persons } = this.state;

        return (
        	<Fragment>
	        	<Navigation location={location} show={this.state.show} sound={this.handleSound}/>
	        	<main className={this.props.nav.isOpen ? 
                `${styles.Dashboard} ${styles.navActive} flex flex-column items-center` : 
                `${styles.Dashboard} flex flex-column justify-start items-center`}>
                    {match.isExact ?
                    <Fragment> 
                      <h1>Dashboard</h1>
                      <div className="w-100 flex flex-wrap justify-center items-center">
                        <ChartContainer>
                          <NotesChart status={true} chart="Doughnut"/>
                        </ChartContainer>
                        <ChartContainer>
                          <NotesChart status={false} />
                        </ChartContainer>
                      </div>
                      <div className="w-100 flex flex-wrap justify-center items-center">
                        <ChartContainer>
                          <NotesChart status={true} chart="Bar" />
                        </ChartContainer>
                        <ChartContainer>
                          <PersonsDisplay persons={persons}/>
                        </ChartContainer>
                      </div>
                    </Fragment> : 
                    <Switch>
                    {routes.map((route, i) => (
                        <Route key={i} path={route.path} component={route.component} />
                    ))}
                    <Route component={NotFound} />
                    </Switch>}
	        	</main>
        	</Fragment>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
    notes: state.renderNotes.notes,
    alarmTimer: state.timer.alarmTimer,
    persons: state.persons.persons
});

export default connect(mapStateToProps, {
  navigationActive,
  updateNote,
  removeNote,
  renderNotes,
  getUpdatedNotes,
  getPersons
})(withRouter(Dashboard));
