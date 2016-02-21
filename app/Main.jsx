import React from 'react';
import ReactDOM from 'react-dom';

import IntroductionComponent from './components/introduction/index.jsx';
import CommentListComponent from './components/comment/index.jsx';
import TaskManagerComponent from './components/tasklist/index.jsx';
import CalendarComponent from './components/calendar/index.jsx';

import Comments from './collections/comments.js';
import Tasks from './collections/tasks.js';

import User from './lib/user.js';

// import styles for this component
require('!style!css!sass!./styles/app.scss');

// end of imports

const container = document.getElementById('container');

const comments = new Comments();

const tasks = new Tasks();

const currentUser = new User();
currentUser.setShouldShowIntro(true);

class App extends React.Component {

	componentDidMount() {
		const shouldShowAnimation = currentUser.shouldSeeIntroAnimation();
		if (shouldShowAnimation) window.scrollTo(0,0);  
	}

	render() {

		return (
			<div>
				<IntroductionComponent user={currentUser} />
				{/*<CalendarComponent />*/}
				<CommentListComponent comments={comments} />
				<TaskManagerComponent tasks={tasks} />
			</div>
		)

	}

}

ReactDOM.render(<App />, container);