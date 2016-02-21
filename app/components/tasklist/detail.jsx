import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class TaskDetailComponent extends React.Component {

	render() {
		const task = this.props.task;

		var body;

		if (task.text) {
			body = (<p>{task.text}</p>)
		}

		return (
			<div className="task-detail">
				<h3>{task.title}</h3>
				{body}
			</div>
		)
	}

}