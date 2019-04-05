import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { handleKeyspaceChange } from './../actions/actioncreater';
import { resetAllConditions } from './../actions/CommonActionCreater';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import APITransport from './../api/apiTransport';
import Notification from './../common/Notification';
import ExecuteAPI from '../api/executeAPI';
import C from './../api/constants';

class KeyspaceSelect extends Component {
	constructor(props) {
		super(props);
	}

	callAPI() {
		let query = 'SELECT DISTINCT keyspace_name from system_schema.columns';
		let executeAPI = new ExecuteAPI(query, C.ADD_KEYSPACES);
		this.props.APITransport(executeAPI);
	}

	render() {
		let props = this.props;
		return (
			<FormControl className={props.classes.formControl}>
				<InputLabel htmlFor="keyspaces">Keyspaces</InputLabel>
				<Select
					value={props.queryReducer.keyspace}
					onChange={(event) => {
						props.handleKeyspaceChange(event.target.value);
						props.resetAllConditions();
					}}
					// onMouseDown={(event) => props.PopulateKeySpace()}
					onMouseDown={(event) => this.callAPI()}
					inputProps={{
						name: 'keyspaces',
						id: 'keyspaces'
					}}
					style={{ fontSize: '12px' }}
				>
					{props.formDataReducer['keyspaces'] !== undefined ? (
						props.formDataReducer['keyspaces'].map((val, index) => (
							<MenuItem key={index} value={val}>
								{val}
							</MenuItem>
						))
					) : null}
				</Select>
			</FormControl>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		queryReducer: state.queryReducer,
		formDataReducer: state.formDataReducer
	};
};

const matchDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			APITransport: APITransport,
			handleKeyspaceChange: handleKeyspaceChange,
			resetAllConditions: resetAllConditions
		},
		dispatch
	);
};

export default connect(mapStateToProps, matchDispatchToProps)(KeyspaceSelect);
