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
import DbTabs from './dbTabs';
import { withStyles } from '@material-ui/core';
import Header from '../common/Header';

class Home extends Component<*> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <Header />
        <DbTabs />
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Home));
