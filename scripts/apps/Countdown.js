import Sound from '../components/Sound.js';

/**
 * Countdown
 */

export default class Countdown {
	constructor({ node }) {
		this.node = node;

		this.display = this.node.querySelector('[data-countdown-display]');
		this.input = this.node.querySelector('[data-countdown-input]');
		this.start = this.node.querySelector('[data-countdown-start]');
		this.pause = this.node.querySelector('[data-countdown-pause]');
		this.reset = this.node.querySelector('[data-countdown-reset]');

		this.counter = 0;
		this.isStarted = false;
		this.isPaused = false;
		this.interval = null;
		this.sound = new Sound(
			'https://soundbible.com/mp3/bells-tibetan-daniel_simon.mp3',
		);

		this.init();

		this.input.addEventListener('change', this.onChange.bind(this));
		this.start.addEventListener('click', this.onStart.bind(this));
		this.pause.addEventListener('click', this.onPause.bind(this));
		this.reset.addEventListener('click', this.onReset.bind(this));
	}

	init() {
		this.showTimer();
	}

	onChange(e) {
		this.counter = parseInt(e.target.value, 10);
	}

	onStart() {
		if (this.isStarted || !this.input.value) return;
		this.showTimer();

		this.isStarted = true;
		this.interval = window.setInterval(() => {
			if (!this.isPaused) {
				if (this.counter > 0) {
					this.counter -= 1;
					this.showTimer();
				} else {
					this.notify();
				}
			}
		}, 1000);
	}

	onPause() {
		if (!this.isStarted) return;

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
		this.input.value = ''; /* resolve closing window error */
		this.counter = 0;
		this.showTimer();
		this.sound.stop();
	}

	showTimer() {
		const days = ('0' + Math.floor(this.counter / (60 * 24))).slice(-2);
		const hours = ('0' + Math.floor((this.counter % (60 * 24)) / 60)).slice(-2);
		const minutes = ('0' + Math.floor((this.counter % (60 * 24)) % 60)).slice(
			-2,
		);
		this.display.textContent = `${days}:${hours}:${minutes}`;
	}

	notify() {
		this.isStarted = false;
		window.clearInterval(this.interval);
		this.counter = parseInt(this.input.value, 10);

		this.sound.play();
	}
}
