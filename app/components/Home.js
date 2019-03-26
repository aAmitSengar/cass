// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
// import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { Wave } from 'react-animated-text';
import styles from './Home.css';
import {
	ImportConnections,
	AddNewConnection,
	deleteConnection,
	makeConnection,
	setConnectedDBIndex
} from './../actions/ConnectionActionCreater';
import APITransport from './../api/apiTransport';
import GetConnections from '../api/getConnections';
import DbTabs from './dbTabs';


type Props = {};

class Home extends Component<*> {
	constructor(props) {
		super(props);
		// this.submit = this.submit.bind(this);
	}
	submit() {
		console.log('clicked');
		let apiObj = new GetConnections(
			{
				contactPoints: 'localhost',
				port: 9042,
				uid: '',
				pwd: '',
				keyspace: 'system_schema',
				name: 'localhost'
			},
			3000
		);
		this.props.APITransport(apiObj);
		// let api= new APITransport()
    // this.props.ImportConnections(this.props.test.connectionsReducer.connections[0]);
    // <Link to={routes.COUNTER}>to Counter</Link>
	}
	render() {
		return (
			<div className={styles.container} data-tid="container">
				<h3> <Wave text="Cassandra UI Editor" effect="fadeOut" effectDuration={1} speed={10}/></h3>


        <input type="submit" id="name" onClick={this.submit.bind(this)} />
        <DbTabs />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		test: state
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			APITransport: APITransport,
			ImportConnections: makeConnection
		},
		dispatch
	);
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
