// DEPENDENCIES
import React, { PureComponent, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

// ACTIONS
import { 
  navigationActive,
  getPersons,
  updateNote, 
  removeNote, 
  getUpdatedNotes,
  renderNotes 
} from '../../actions';

// COMPONENTS
import Navigation from '../Navigation';
import { 
  ChartContainer,
  NotesChart,
  PersonsDisplay,
  NotFound } from '../../components';

import Notes from '../Notes';
import Reminders from '../Reminders';
import Archive from '../Archive';
import Bin from '../Bin';

// STYLES
import styles from './Dashboard.module.scss';

// GLOBAL VARIABLES
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
      const { persons } = this.props;
      this.state = {
        show: false,
        persons: persons
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
      const { show } = this.state;
      const notesWithAlarms = notes.filter(note => note.alarm);
      const currentNote = notesWithAlarms.filter(note => 
        moment(
          alarmTimer, "YYYY-MM-DDTHH:mm"
        ).isSame(moment(note.alarm, "YYYY-MM-DDTHH:mm"), 'minute'))[0];
        
      current = currentNote._id;

      if(!show) {
        sound.pause();
        sound.currentTime = 0;
      }
    }

    componentDidUpdate(prevProps, prevState) {
      const { persons } = this.props;
      if(prevProps.persons !== persons) {
        this.setState({ persons });
      }
    }

    componentDidMount() {
      const { renderNotes, getUpdatedNotes, getPersons } = this.props;
      sound.addEventListener('play', this.handlePlay);
      renderNotes();
      getUpdatedNotes('reminders');
      getUpdatedNotes('archive');
      getUpdatedNotes('delete');
      getPersons();
    }

    componentWillUnmount() {
      sound.removeEventListener('play', this.handlePlay);
    }

    render() {
        const { location, match, nav } = this.props;
        const { persons, show } = this.state;

        return (
        	<Fragment>
	        	<Navigation location={location} show={show} sound={this.handleSound}/>
	        	<main className={nav.isOpen ? 
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
