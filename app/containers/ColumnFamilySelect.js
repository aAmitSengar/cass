import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { handleColumnFamilyChange } from './../actions/actioncreater';
import { resetAllConditions } from './../actions/CommonActionCreater';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import C from './../api/constants';

import APITransport from './../api/apiTransport';
import Notification from './../common/Notification';
import ExecuteAPI from '../api/executeAPI';

class ColumnFamilySelect extends Component {
	constructor(props) {
		super(props);
	}

	callAPI(keyspace) {
		let query = "SELECT table_name from system_schema.columns where keyspace_name = '" + keyspace + "'";
		let executeAPI = new ExecuteAPI(query, C.ADD_COLUMN_FAMILIES);
		this.props.APITransport(executeAPI);
  }

  PopulateColumns(queryReducer) {
  if (queryReducer.keyspace === '' || queryReducer.columnFamily === '') {
    return null;
  }
  let query =
    "SELECT column_name, kind, type from system_schema.columns where keyspace_name = '" +
    queryReducer.keyspace +
    "' and table_name = '" +
    queryReducer.columnFamily +
    "'";

 		let executeAPI = new ExecuteAPI(query, C.ADD_COLUMNS);
		this.props.APITransport(executeAPI);
}

	render() {
		let props = this.props;
		return (
			<FormControl className={props.classes.formControl}>
				<InputLabel htmlFor="columnFamily">Column Families</InputLabel>
				<Select
					value={props.queryReducer.columnFamily}
					onChange={(event) => {
						props.handleColumnFamilyChange(event.target.value);
						props.resetAllConditions();
						const copiedValues = {
							...props.queryReducer,
							columnFamily: event.target.value
						};
						this.PopulateColumns(copiedValues);
					}}
					onMouseDown={(event) => {
						props.queryReducer.keyspace !== ''
							? this.callAPI(props.queryReducer.keyspace) //props.PopulateColumnFamilies(props.queryReducer.keyspace)
							: null;
					}}
					inputProps={{
						name: 'columnFamily',
						id: 'columnFamily'
					}}
					style={{ fontSize: '12px' }}
				>
					{props.formDataReducer['columnFamilies'] !== undefined ? (
						props.formDataReducer['columnFamilies'].map((val, index) => (
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
			handleColumnFamilyChange: handleColumnFamilyChange,
			resetAllConditions: resetAllConditions
		},
		dispatch
	);
};

export default connect(mapStateToProps, matchDispatchToProps)(ColumnFamilySelect);
