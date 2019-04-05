import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SelectQuery from './selectQuery';
import Connection from './Connection';
import InsertQuery from './insertQuery';
import { bindActionCreators } from 'redux'
import { showNotification } from './../actions/NotificationActionCreater';


class DbTabs extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    if(value>0){
      if(this.props.connectionsReducer
        && this.props.connectionsReducer.connections
        && this.props.connectionsReducer.connections.length>0
        && this.props.connectionsReducer.connectedIndex>=0)
      {this.setState({ value });}else{
        this.props.showNotification(
          true,
         'Please connect to a database first.',
          'warning'
        );
      }
    }else{
      this.setState({ value });
    }

  };

  //   <Tab
  //   disableRipple
  //   label="Admin"
  // />

  render() {
    const { value } = this.state;

    return (
      <div>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab disableRipple label="Connection" classes={this.props.theme} />
          <Tab disableRipple label="Query" />
          <Tab disableRipple label="Insert Record" />
        </Tabs>
        {this.props.apistatus.progress && (
					<CircularProgress
						size={60}
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%'
						}}
					/>
				)}
        {value === 0 && <Connection />}
        {value === 1 && <SelectQuery />}
        {value === 2 && <InsertQuery />}
      </div>
    );
  }
}
// this.props.connectionsReducer.connectedIndex;
const mapStateToProps = state => {
  return {
    connectionsReducer: state.connectionsReducer,
    apistatus: state.apistatus
  };
};
const matchDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			showNotification: showNotification
		},
		dispatch
	);
};
export default connect(mapStateToProps,matchDispatchToProps)(DbTabs);

