import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { handleColumnsChange, PrepareQuertyStatement } from './../actions/actioncreater';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import APITransport from './../api/apiTransport';
import Notification from './../common/Notification';
import ExecuteAPI from '../api/executeAPI';
import _ from 'lodash';

class ColumnsSelect extends Component {
	constructor(props) {
		super(props);
	}
	handleOnChangeEvent = (event) => {
		let listOfColumns = [];
		if (event.target.value[event.target.value.length - 1] === 'All') {
			this.props.formDataReducer['columnDetails'].map((val, index) => listOfColumns.push(`"${val.column_name}"`));
		} else {
			listOfColumns = _.map(event.target.value, (i) => `"${i}"`);
		}

		this.props.handleColumnsChange(listOfColumns);
		const newState = { ...this.props.queryReducer, columns: listOfColumns };
		this.props.PrepareQuertyStatement(newState, this.props.conditionReducer);
	};
	render() {
		let props = this.props;
		return (
			<FormControl className={props.classes.formControl}>
				<InputLabel htmlFor="columns">Columns</InputLabel>
				<Select
					fullWidth={false}
					multiple={true}
					value={props.queryReducer.columns}
					onChange={(event) => {
						this.handleOnChangeEvent(event);
					}}
					inputProps={{
						name: 'columns',
						id: 'columns'
					}}
					style={{ fontSize: '12px' }}
				>
					{
						<MenuItem key={-1} value={'All'}>
							<u>
								<b>
									<i>All</i>
								</b>
							</u>
						</MenuItem>
					}
					{props.formDataReducer['columnDetails'] !== undefined ? (
						props.formDataReducer['columnDetails'].map((val, index) => (
							<MenuItem key={index} value={val.column_name}>
								{val.column_name}
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
		formDataReducer: state.formDataReducer,
		conditionReducer: state.conditionReducer
	};
};

const matchDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			handleColumnsChange: handleColumnsChange,
			PrepareQuertyStatement: PrepareQuertyStatement
		},
		dispatch
	);
};

export default connect(mapStateToProps, matchDispatchToProps)(ColumnsSelect);
