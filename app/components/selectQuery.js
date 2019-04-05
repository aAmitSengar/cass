import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import ExecuteQuery from './../containers/ExecuteQuery';
import ConditionContainer from './../containers/ConditionContainer';
import Result from './../containers/Result';
import { withStyles } from '@material-ui/core/styles';
import KeyspaceSelect from './../containers/KeyspaceSelect';
import ColumnFamilySelect from './../containers/ColumnFamilySelect';
import ColumnsSelect from './../containers/ColumnsSelect';

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 220,
		maxWidth: 220
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	},
	button: {
		width: 30,
		height: 0.5
	}
});

const SelectQuery = (props) => {
	const { classes } = props;
	return (
		<Paper>
			<Grid container spacing={24}>
				<Grid item xs={12} sm={4}>
					<KeyspaceSelect classes={classes} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<ColumnFamilySelect classes={classes} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<ColumnsSelect classes={classes} />
				</Grid>
			</Grid>

			<Grid container spacing={24}>
				<Grid item xs={12} sm={12}>
					<ConditionContainer classes={classes} />
				</Grid>
			</Grid>
			<Grid container spacing={24}>
				<Grid item xs={12} sm={12}>
					<ExecuteQuery classes={classes} />
				</Grid>
			</Grid>
			<Grid containe spacing={24}r>
				<Grid item xs={12} sm={12}>
					<Result />
				</Grid>
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(SelectQuery);
