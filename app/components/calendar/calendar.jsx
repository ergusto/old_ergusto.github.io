import React from 'react';
import Calendar from '../../lib/calendar.js';

import CalendarItemComponent from './item.jsx';

// import styles for this component
require('!style!css!sass!./styles/calendar.scss');

export default class CalendarComponent extends React.Component {

	previousMonthHandler(event) {
		event.preventDefault();
		const month = this.props.month;
		this.props.setMonth(month.getPrevMonth());
	}

	nextMonthHandler(event) {
		event.preventDefault();
		const month = this.props.month;
		this.props.setMonth(month.getNextMonth());
	}

	render() {

		const month = this.props.month;

		const subheaderHTML = this.props.calendar.weekdaysAbbr.map((day) => {
			return <li key={Math.random()} className="padding-sm">{day}</li>;
		});

		const calendarHTML = month.weeks.map((week) => {
			const weekHTML = week.map((day) => {
				if (day.date) {
					return <CalendarItemComponent key={Math.random()} day={day} diary={this.props.diary} setActiveDay={this.props.setActiveDay} />
				} else {
					return <li key={Math.random()} className="calendar-day-empty padding-sm"></li>;
				}
			});

			return <ul key={Math.random()} className="calendar-list calendar-week clearfix">{weekHTML}</ul>;
		})

		return (

			<div className="calendar box">

				<header className="calendar-header padding">

					<h2>{month.name} {month.year}</h2>

				</header>

				<ul className="calendar-buttons calendar-subheader horizontal-list-menu--btns border-vertical">
					<li className="pull-right"><a href="#" onClick={this.nextMonthHandler.bind(this)} className="btn btn-large pull-right">next</a></li>
					<li><a href="#" onClick={this.previousMonthHandler.bind(this)} className="btn btn-large">previous</a></li>
				</ul>

				<ul className="calendar-subheader horizontal-list-menu border-bottom">

					{subheaderHTML}

				</ul>

				<div className="clearfix">

					{calendarHTML}

				</div>

			</div>

		);
	}

}