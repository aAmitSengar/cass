import React, { Component } from 'react';
import { TextField, Button, Paper, Fab } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddQueryStatement } from './../actions/actioncreater';
import { AddResult } from './../actions/ResultActionCreater';
import CassandraAPICalls from './../service/CassandraAPICalls';
import { showNotification } from './../actions/NotificationActionCreater';
import Notification from './../common/Notification';
import APITransport from './../api/apiTransport';
import GetRecordsAPI from './../api/getRecordsAPI';

class ExecuteQuery extends Component {
	constructor(props) {
		super(props);
		this.state = { isProgress: false };
	}
	executeSelect = (statement) => {
		let api = new GetRecordsAPI(statement, 3000);
		this.props.APITransport(api);
		this.setState({ isProgress: false });
		// CassandraAPICalls.fireGetQuery(statement)
		// .then(
		//     resp => {
		//         if (resp.status === 200) {
		//             this.props.showNotification(true, "Record fetched Successfully", 'success')
		//         }
		//         else {
		//             this.props.showNotification(true, "No Record Found", 'warning')
		//         }
		//         if (resp.data !== undefined) {
		//             this.props.AddResult(resp.data)
		//         }
		//         this.setState({ isProgress: false })
		//     }
		// )
		// .catch(error => {
		//     console.log(error)
		//     this.props.AddResult([])
		//     this.props.showNotification(true, error.response.statusText, 'error')
		//     this.setState({ isProgress: false })
		// })
	};

	executeDelete = (statement) => {
		let api = new GetRecordsAPI(statement, 3000);
		this.props.APITransport(api);
		this.setState({ isProgress: false });

		// CassandraAPICalls.fireQuery(statement)
		//   .then(resp => {
		//     if (resp.status === 200) {
		this.props.showNotification(true, 'Record Deleted Successfully', 'success');
		//   } else {
		//     this.props.showNotification(true, 'No Record Found', 'warning');
		//   }
		//   if (resp.data !== undefined) {
		//     this.props.AddResult(resp.data);
		//   }
		//   this.setState({ isProgress: false });
		// })
		// .catch(error => {
		//   console.log(error);
		//   this.props.AddResult([]);
		//   this.props.showNotification(
		//     true,
		//     'Delete Query Failed ' + error,
		//     'error'
		//   );
		//   this.setState({ isProgress: false });
		// });
	};

	handleOnClick = () => {
		const { statement } = this.props;

		if (statement === '') {
			this.props.showNotification(
				true,
				'Select keyspace, column family and columns for this operation',
				'warning'
			);
		} else {
			this.setState({ isProgress: true });
			if (statement.includes('DELETE') || statement.includes('delete')) {
				this.executeDelete(statement);
			} else {
				this.executeSelect(statement);
			}
		}
	};

	render() {
		console.log('render() : ExecuteQuery');
		return (
			<div>
				<Notification />
				<TextField
					id="query"
					label="query"
					multiline
					value={this.props.statement}
					onChange={(event) => this.props.AddQueryStatement(event.target.value)}
					style={{ width: '99%', margin: '0.5%' }}
				/>
				<Paper style={{ padding: '20px 20px' }}>
					<Fab
						onClick={() => this.handleOnClick()}
						variant="extended"
						aria-label="execute"
						style={{ background: '#424242' }}
					>
						Execute
					</Fab>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		statement: state.queryReducer.statement
	};
};

const matchDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			APITransport: APITransport,
			AddQueryStatement: AddQueryStatement,
			AddResult: AddResult,
			showNotification: showNotification
		},
		dispatch
	);
};

export default connect(mapStateToProps, matchDispatchToProps)(ExecuteQuery);
