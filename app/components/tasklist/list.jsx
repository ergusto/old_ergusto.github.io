import React from 'react';

import TaskItemComponent from './item.jsx';

// import styles for this component
require('!style!css!sass!./styles/list.scss');

export default class TaskListComponent extends React.Component {

	constructor(props) {
		super(props);
		props.tasks.onChange(() => {
			this.forceUpdate()
		});
	}

	clickHandler(task, event) {
		event.preventDefault();
		this.props.setActiveTask(task);
	} 

	removeHandler(id, event) {
		event.preventDefault();
		const { tasks, showTaskForm } = this.props;
		tasks.remove(id);
		showTaskForm();
	}

	render() {
		const { tasks } = this.props;
		const taskList = tasks.get();
		let content;

		if (taskList.length) {
			content = taskList.map((task) => {
				return <TaskItemComponent key={task.id} task={task} clickHandler={this.clickHandler.bind(this, task)} removeHandler={this.removeHandler.bind(this, task)} />;
			});
		} else {
			content = (
				<li>No tasks!</li>
			)
		}

		return (
			<ul className="task-list">{content}</ul>
		)
	}

}