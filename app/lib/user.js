import _ from 'underscore';
import LocalStorageBehaviour from '../behaviours/localstorage.js';
import EventBehaviour from '../behaviours/event.js';

export default class User {

	constructor() {
		this.events = new EventBehaviour();

		this.user = {};
		this.user.username = 'ergusto';

		this.user.settings = {};
		this.user.settings.showIntroAnimation = true;

		this.storeName = 'ERGUSTO:user';

		if (window.localStorage) {
			this.usingLocalStorage = true;
			this.store = new LocalStorageBehaviour(this.storeName);
			
			const user = this.store.get();
			if (user) {
				this.user = user;
			}

		} else {
			this.usingLocalStorage = false;
		}
	}

	updateStorage() {
		this.store.set(this.user);
	}

	resetAllLocalStorage() {
		this.store.resetBrowserLocalStorage();
	}

	getUsername() {
		const username = this.user.username;
		return username.length ? username : 'ergusto';
	}

	onUpdate(callback) {
		this.events.register('update', callback);
	}

	set(property, value) {
		this.user[property] = value;
		this.updateStorage();
		this.events.broadcast('update');
	}

	setSetting(property, value) {
		this.user.settings[property] = value;
		this.updateStorage();
		this.events.broadcast('update');
	}

	setUsername(username) {
		this.set('username', username);
	}

	setShouldShowIntro(boolean) {
		this.setSetting('showIntroAnimation', boolean);
	}

	shouldSeeIntroAnimation() {
		return this.user.settings.showIntroAnimation;
	}

}