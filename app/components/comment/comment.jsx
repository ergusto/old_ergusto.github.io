import React from 'react';
import TimeAgo from 'react-timeago';
import CommentFormComponent from './form.jsx';

// import styles for this component
require('!style!css!sass!./styles/comment.scss');

export default class CommentComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.state.shouldShowReplyForm = false;
		this.state.shouldShowEditForm = false;
		this.state.comment = '';

		// http://stackoverflow.com/a/31362350/4566267
		this.replyHandler = this.replyHandler.bind(this);
		this.editHandler = this.editHandler.bind(this);
		this.updateComment = this.updateComment.bind(this);
	}

    showEditForm() {
    	this.hideReplyForm();
    	this.setState({
    		shouldShowEditForm: true,
    	});
    }

    hideEditForm() {
    	this.setState({
    		shouldShowEditForm: false,
    	});
    }

    showReplyForm() {
    	this.hideEditForm();
        this.setState({
            shouldShowReplyForm: true,
        });
    }

    hideReplyForm() {
        this.setState({
            shouldShowReplyForm: false,
        });
    }

    replyHandler(event) {
        event.preventDefault();
        this.showReplyForm();
    }

    editHandler(event) {
    	event.preventDefault();
    	this.showEditForm();
    }

    addNewComment(comment) {
        console.log(comment);
    	this.props.comments.add(comment);
    }

    removeHandler(comment, event) {
    	event.preventDefault();
    	this.props.comments.remove(comment.id);
    }

    updateComment(comment) {
        return;
        this.props.comments.update(comment);
    }
    
    render() {
    	const comment = this.props.comment;
        const commentValue = this.state.comment && this.state.comment.length ? this.state.comment : comment.text;
        return (

        	<div>

	        	<div className="comment-item box">
	                <header className="comment-item-header clearfix">
	                    <p className="muted"><small>{comment.username}</small></p>
	                </header>
	                <div className="comment-item-body">
	                    <p>{commentValue}</p>
	                </div>
	                <footer className="comment-item-footer clearfix">
	                    <ul className="horizontal-list-menu muted">
	                        <li className="pull-right"><TimeAgo date={this.props.comment.date} /></li>
	                        <li><a href="#" onClick={this.replyHandler.bind(this)}>reply</a></li>
	                        <li><a href="#" onClick={this.editHandler.bind(this)}>edit</a></li>
	                        <li><a href="#" onClick={this.removeHandler.bind(this, comment)}>remove</a></li>
	                    </ul>
	                </footer>
	            </div>

	            <CommentFormComponent user={this.props.user} formTitle="reply" shouldShowForm={this.state.shouldShowReplyForm} submitCallback={this.addNewComment.bind(this)} hideForm={this.hideReplyForm.bind(this)} />
	            <CommentFormComponent {...this.props} user={this.props.user} formTitle="edit" comment={comment} submitCallback={this.updateComment.bind(this)} shouldShowForm={this.state.shouldShowEditForm} hideForm={this.hideEditForm.bind(this)} />

	        </div>
        );
    }

};