import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Button, Paper } from '@material-ui/core';
import { deleteConnection, setConnectedDBIndex } from './../actions/ConnectionActionCreater';
import { resetState } from './../actions/CommonActionCreater';
import { showNotification } from './../actions/NotificationActionCreater';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Fab from '@material-ui/core/Fab';

import APITransport from './../api/apiTransport';
import Notification from './../common/Notification';
import MakeConnectionsAPI from '../api/makeConnectionsAPI';

const styles = (theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
});

export class Oldconnection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isProgress: false,
			conn: {},
			index: -1
		};
	}
	componentWillReceiveProps(newProps) {
		let newIndex = newProps.connectionsReducer.connectedIndex;
		let OldIndex = this.props.connectionsReducer.connectedIndex;
		if (newIndex >= 0 && newIndex !== OldIndex) {
			this.props.showNotification(
				true,
				newProps.connectionsReducer.connections[newIndex].name + ' Database Connected',
				'success'
			);

			this.setState({ isProgress: false });
		} else {
			// something went wrong
		}
	}

	handleClick = (conn, index) => {
		this.setState({ isProgress: true });
		// this.props.setConnectedDBIndex(index);
		let apiObj = new MakeConnectionsAPI(conn, index, 3000);
		this.props.APITransport(apiObj);

		// if (this.props) {

		// }

		// CassandraAPICalls.makeConnection(conn).then(
		//   resp => {
		//     if (resp.status === 200) {
		//       this.props.showNotification(true, conn.name + " Database Connected", 'success')
		//       this.props.setConnectedDBIndex(index)
		//     }
		//     else {
		//       this.props.showNotification(true, conn.name + " Database NotConnected : " + resp.statusText, 'error')
		//       this.props.setConnectedDBIndex(-1)
		//     }
		//     this.setState({ isProgress: false })
		//   }
		// )
		// this.props.resetState()
	};

	render() {
		console.log('render() : OldConnection');
		const { classes, connectionsReducer } = this.props;

		if (connectionsReducer === undefined) {
			console.log('connectionsReducer is undefined');
			return null;
		}
		return (
			<div className={classes.root}>
        <Notification />
				<List>
					{connectionsReducer.connections === undefined ? null : (
						connectionsReducer.connections.map((conn, index) => {
							return conn === undefined || conn === null ? null : (
								<Paper key={index} style={{ width: '70%' }}>
									<ListItem button>
										<Tooltip title="Delete Connection">
											<IconButton
												aria-label="Edit"
												style={{ background: 'white' }}
												onClick={(event) =>
													this.props.deleteConnection(connectionsReducer.connections, index)}
											>
												<DeleteIcon
													style={{
														height: '25px',
														width: '25px',
														color: '#7f0000',
														background: 'white'
													}}
												/>
											</IconButton>
										</Tooltip>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<Tooltip key={index} title={conn.contactPoints}>
											<Button
												style={
													connectionsReducer.connectedIndex === index ? (
														{ backgroundColor: 'green' }
													) : null
												}
												onClick={(event) => this.handleClick(conn, index)}
											>
												{conn.name}
											</Button>
										</Tooltip>
									</ListItem>
									<Divider />
								</Paper>
							);
						})
					)}
				</List>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		connectionsReducer: state.connectionsReducer,
		getConnResponse: state.getConnResponse
	};
};

const matchDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			APITransport: APITransport,
			deleteConnection: deleteConnection,
			resetState: resetState,
			showNotification: showNotification,
			setConnectedDBIndex: setConnectedDBIndex
		},
		dispatch
	);
};

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Oldconnection));
