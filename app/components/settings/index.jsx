import _ from 'underscore';
import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/settings.scss');

export default class SettingsComponent extends  React.Component {
    
    constructor(props) {
        super(props);

        this.state = {};
        this.state.shouldShowDropDown = false;
        
        this.props.user.register(() => {
            this.forceUpdate();
        });
    }

    triggerClickHandler(event) {
    	event.preventDefault();
    	this.toggleDropdown();
    }

    toggleDropdown() {
    	this.setState({
    		shouldShowDropDown: !this.state.shouldShowDropDown
    	});
    }

    setUserIntroAnimationSetting(setting) {
    	this.props.user.setShouldShowIntro(setting);
    }

    showIntroHandler(event) {
    	event.preventDefault();
    	this.setUserIntroAnimationSetting(true);
    }

    hideIntroHandler(event) {
    	event.preventDefault();
    	this.setUserIntroAnimationSetting(false);
    }

    render() {
    	let dropdownClass;
    	let triggerClass;
    	let labelText;
        let showDisabled;
        let hideDisabled;

    	if (this.state.shouldShowDropDown) {
    		dropdownClass = 'dropdown box';
    		triggerClass = 'settings-trigger opaque';

    	} else {
            dropdownClass = 'hidden dropdown';
            triggerClass = 'settings-trigger';
        }

    	if (this.props.user.shouldSeeIntroAnimation()) {
            labelText = 'show intro animation';
            showDisabled = true;
            hideDisabled = false;
        } else {
            labelText = 'do not show intro animation';
            showDisabled = true;
            hideDisabled = false;
        }

        return (
        	<div className="settings pull-right">
        		<a onClick={this.triggerClickHandler.bind(this)} href="#" ref="dropdowntrigger" className={triggerClass}>&#x221e;</a>

        		<div className={dropdownClass}>
        			<h5 className="settings-title">settings</h5>
        			<label className="settings-label"><small>{labelText}</small></label>
        			<a onClick={this.showIntroHandler.bind(this)} disabled={showDisabled} href="#" className="btn">show animation</a>
                    <a onClick={this.hideIntroHandler.bind(this)} disabled={hideDisabled} href="#" className="btn">hide animation</a>
        		</div>
        	</div>
        );
    }

}