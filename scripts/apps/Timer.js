/**
 * Timer
 */

export default class Timer {
	constructor({ node }) {
		this.node = node;

		this.display = this.node.querySelector('[data-timer-display]');
		this.start = this.node.querySelector('[data-timer-start]');
		this.pause = this.node.querySelector('[data-timer-pause]');
		this.reset = this.node.querySelector('[data-timer-reset]');

		this.counter = 0;
		this.isStarted = false;
		this.isPaused = false;
		this.interval = null;

		this.init();

		this.start.addEventListener('click', this.onStart.bind(this));
		this.pause.addEventListener('click', this.onPause.bind(this));
		this.reset.addEventListener('click', this.onReset.bind(this));
	}

	init() {
		this.showTimer();
	}

	onStart() {
		if (this.isStarted) return;

		this.isStarted = true;
		this.interval = window.setInterval(() => {
			if (!this.isPaused) {
				this.counter += 1;
				this.showTimer();
			}
		}, 1000);
	}

	onPause() {
		if (this.isPaused) {
			this.pause.textContent = 'Pause';
			this.isPaused = false;
		} else {
			this.pause.textContent = 'Resume';
			this.isPaused = true;
		}
	}

	onReset() {
		this.isStarted = false;
		window.clearInterval(this.interval);
		this.pause.textContent = 'Pause'; /* resolve closing window error */
		this.counter = 0;
		this.showTimer();
	}

	showTimer() {
		const days = ('0' + Math.floor(this.counter / (60 * 24))).slice(-2);
		const hours = ('0' + Math.floor((this.counter % (60 * 24)) / 60)).slice(-2);
		const minutes = ('0' + Math.floor((this.counter % (60 * 24)) % 60)).slice(
			-2,
		);
		this.display.textContent = `${days}:${hours}:${minutes}`;
	}
}
