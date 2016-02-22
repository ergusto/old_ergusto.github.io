import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/form.scss');

export default class CommentFormComponent extends React.Component {

	constructor(props) {
		super(props);
		const comment = this.props.comment;
		this.state = {};
		this.state.formError = '';
		this.state.isEditing = false;
		this.state.commentLength = comment ? comment.text.length : 0;
	}

	componentWillUnmount() {
		this.clearError();
	}

	addError(error) {
		this.setState({
			formError: error
		});
	}

	clearError() {
		this.setState({
			formError: null
		});
	}

	newComment() {
		const comment = {};
		const parent = this.props.parent;
		comment.text = '';
		comment.date = new Date;
		comment.parentId = parent && parent.id || '';
		comment.username = this.props.user.getUsername();
		return comment;
	}

	cancelHandler(event) {
		event.preventDefault();
		this.props.cancelCallback();
	}

	submitHandler(event) {
		event.preventDefault();
		let saved;
		const textInputValue = this.refs.commentInput.value;
		const comment = this.props.comment || this.newComment();

		if (!this.state.isEditing) {
			this.isEditing = true;

			if (!textInputValue.trim().length) {
				this.addError('Please enter a comment');
				this.isEditing = false;
				return;
			}

			comment.text = textInputValue;

			if (comment.id) {
				saved = this.props.comments.update(comment);
			} else {
				saved = this.props.comments.create(comment);
			}

			if (this.props.submitCallback) {
				this.props.submitCallback(saved);
			}

			this.refs.commentInput.value = '';
			this.isEditing = false;
		}
	}

	setCommentLength(length) {
		length = length || this.refs.commentInput.value.length;
		this.setState({
			commentLength: length
		});
	}

	changeHandler() {
		this.setCommentLength();
	}

	render() {
		const shouldShowForm = this.props.shouldShowForm;
		const formTitle = this.props.formTitle || 'comment';
		const comment = this.props.comment;
		const err = this.state.formError;
		let errContent;
		let defaultValue;

		if (err) {
			errContent = (<span className="form-error">{err}</span>);
		}

		if (comment) {
			defaultValue = comment.text;
		}

		if (!shouldShowForm) return false;

		return (
			<form refs="commentform" onSubmit={this.submitHandler.bind(this)} className="comment-form box padding margin-top">
				<span className="fieldCount pull-right">{this.state.commentLength}</span>
				<label httmlFor="comment"><small>{formTitle}</small></label>
				<textarea onChange={this.changeHandler.bind(this)} ref="commentInput" className="field" name="comment" defaultValue={defaultValue}></textarea>
				{errContent}
				<div className="btn-group">
					<input type="submit" value="submit" className="btn"></input>
					<a className="btn" href="#" onClick={this.cancelHandler.bind(this)}>cancel</a>
				</div>
			</form>
		)
	}

}