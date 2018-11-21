import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Navigation from '../Navigation';
import styles from './Dashboard.module.scss';
import { renderNotes } from '../../actions/renderNotes';
import Notes from '../Notes';
import Reminders from '../Reminders';
import Archive from '../Archive';
import Bin from '../Bin';
import NotFound from '../../components/NotFound';

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

class Dashboard extends React.PureComponent {

    componentDidMount() {
      this.props.renderNotes();
    }

    render() {
        const { location, match } = this.props;
        return (
        	<Fragment>
	        	<Navigation location={location} />
	        	<main className={this.props.nav.isOpen ? 
                `${styles.Dashboard} ${styles.navActive} flex flex-column items-center` : 
                `${styles.Dashboard} flex flex-column items-center`}>
                    {match.isExact ? 
                    <h1>Hello</h1> : 
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
    nav: state.nav
});

export default connect(mapStateToProps, { renderNotes })(withRouter(Dashboard));
